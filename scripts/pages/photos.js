import { getPhotosById, getUsers } from "../helpers.js"
import { renderBreadcrumbs, setDataLoading } from "../render.js"

const state = {
  isEnd: false,
  isLoading: false,
  photosPosition: 0,
  userId: null,
  albumId: null,
  wasScrolled: false,
}

export async function Photos(userId, albumId) {
  renderBreadcrumbs()

  const containerEl = document.querySelector(".container")

  state.isEnd = false
  state.isLoading = false
  state.photosPosition = 0
  state.userId = +userId
  state.albumId = +albumId
  state.wasScrolled = false

  const h1 = document.createElement("h1")
  const photosContainer = document.createElement("div")
  h1.innerHTML = `Album #${albumId} photos`
  photosContainer.classList.add("photos")
  containerEl.appendChild(h1)
  containerEl.appendChild(photosContainer)

  const newPhotos = await loadPhotos()
  appendPhotoElements(newPhotos)

  function appendPhotoElements(photos) {
    if (!photos?.length || !Array.isArray(photos)) {
      return
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !state.isEnd && !state.isLoading) {
          state.wasScrolled = true
          const newPhotos = await loadPhotos()
          appendPhotoElements(newPhotos)
        }
      },
      { threshold: 1 }
    )

    photos
      .map((photo) => {
        const photoEl = document.createElement("div")
        photoEl.classList.add("photo")
        photoEl.innerHTML = `
					<img class="photoImage" width="150" height="150" alt="Photo image" src="${photo.thumbnailUrl}" />
					<div class="photoTitle">${photo.title}</div>
				`

        return photoEl
      })
      .forEach((p) => photosContainer.appendChild(p))

    if (state.isEnd) {
      const endEl = document.createElement("div")
      endEl.classList.add("noMorePhotos")
      endEl.innerHTML = "No more photos"
      containerEl.appendChild(endEl)
    } else {
      const photoEl = document.querySelector(".photos > .photo:last-child")
      if (photoEl) {
        observer.observe(photoEl)
      }
    }
  }
}

async function loadPhotos() {
  setDataLoading(true)
  state.isLoading = true
  const users = await getUsers()
  const isValidUser = Boolean(users.find((u) => u.id === state.userId))
  if (!isValidUser) {
    return (window.location.hash = "#404")
  }

  const photos = await getPhotosById(state.albumId, state.photosPosition)
  state.isLoading = false
  setDataLoading(false)

  if (!photos?.length) {
    if (!state.wasScrolled) {
      return (window.location.hash = "#404")
    }

    state.isEnd = true

    return []
  }

  state.photosPosition += photos.length

  return photos
}
