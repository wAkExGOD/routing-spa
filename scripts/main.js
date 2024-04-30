import { router } from "./router.js"

export const CACHE = {
	users: [],
	albums: {},
	photos: {},
}

router(window.location.hash.replace("#", ""))

window.addEventListener("hashchange", () => {
	router(window.location.hash.replace("#", ""))
})
