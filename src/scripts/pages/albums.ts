import { getAlbumsByUserId } from '../helpers.js'
import { renderBreadcrumbs, setDataLoading } from '../render.js'

export async function Albums(userId: number) {
  renderBreadcrumbs()

  const containerEl = document.querySelector('.container')

  setDataLoading(true)
  const albums = await getAlbumsByUserId(userId)
  setDataLoading(false)

  if (!albums?.length) {
    return (window.location.hash = '#404')
  }

  const h1 = document.createElement('h1')
  const albumsWrapper = document.createElement('div')
  h1.innerHTML = `User #${userId} albums`
  albumsWrapper.classList.add('cards')

  albums
    .map((album) => {
      const albumEl = document.createElement('a')
      albumEl.setAttribute('href', `#users/${album.userId}/albums/${album.id}`)
      albumEl.classList.add('card')
      albumEl.classList.add('album')
      albumEl.innerHTML = `#${album.id} ${album.title}`

      return albumEl
    })
    .forEach((el) => albumsWrapper.appendChild(el))

  containerEl?.appendChild(h1)
  containerEl?.appendChild(albumsWrapper)
}
