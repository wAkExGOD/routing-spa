import { router } from './router.js'
import { Album } from './types/Album.js'
import { Photo } from './types/Photo.js'
import { User } from './types/User.js'

export type Cache = {
  users: User[]
  albums: Record<number, Album[]>
  photos: Record<number, Photo[]>
}

export const CACHE: Cache = {
  users: [],
  albums: {},
  photos: {}
}

router(window.location.hash.replace('#', ''))

window.addEventListener('hashchange', () => {
  router(window.location.hash.replace('#', ''))
})
