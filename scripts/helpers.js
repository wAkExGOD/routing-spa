import { API_URL, PHOTOS_PER_PAGE } from "./constants.js"
import { CACHE } from "./main.js"

export async function fetchData(url, params = {}) {
	try {
		const response = await fetch(
			`${API_URL}/${url}?${new URLSearchParams(params)}`
		)

		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export async function getUsers() {
	if (!CACHE.users.length) {
		const users = await fetchData("users")
		CACHE.users = users || []
	}

	return CACHE.users
}

export const getAlbumsByUserId = async (userId) => {
	if (!userId) {
		return []
	}

	if (!CACHE.albums[userId]) {
		const albums = await fetchData("albums", {
			userId,
		})
		CACHE.albums[userId] = albums.length ? albums : []
	}

	return CACHE.albums[userId]
}

export const getPhotosById = async (albumId, position = 0) => {
	if (!albumId) {
		return []
	}

	if (!CACHE.photos[albumId]) {
		CACHE.photos[albumId] = []
	}

	const photos = CACHE.photos[albumId]

	const arePhotosCached = Boolean(
		photos.slice(position, position + PHOTOS_PER_PAGE).length
	)

	if (!arePhotosCached) {
		const result = await fetchData("photos", {
			_start: position,
			_limit: PHOTOS_PER_PAGE,
			albumId,
		})

		if (result.length > 0) {
			photos.push(...result)
		}
	}

	return photos.slice(position, position + PHOTOS_PER_PAGE)
}
