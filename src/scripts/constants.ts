import { NotFound } from './pages/404.js'
import { Home } from './pages/home.js'
import { Albums } from './pages/albums.js'
import { Photos } from './pages/photos.js'

type Page = {
	title: string
	check: (url: string) => boolean
	render: (url: string) => void
}

export const API_URL = 'https://jsonplaceholder.typicode.com'
export const PHOTOS_PER_PAGE = 15

export const PAGES: Page[] = [
	{
		title: 'Home',
		check: url => /^(^$|users\/?)$/.test(url),
		render: () => Home()
	},
	{
		title: 'Albums',
		check: url => /^users\/\d+\/albums\/?$/.test(url),
		render: url => {
			const userId = +url.split('/')[1]
			Albums(userId)
		}
	},
	{
		title: 'Photos',
		check: url => /^users\/\d+\/albums\/\d+\/?$/.test(url),
		render: url => {
			const userId = +url.split('/')[1]
			const albumId = +url.split('/')[3]
			return Photos(userId, albumId)
		}
	},
	{
		title: '404',
		check: url => /^404$/.test(url) || true,
		render: NotFound
	}
]
