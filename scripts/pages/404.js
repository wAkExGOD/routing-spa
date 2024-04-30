import { hideBreadcrumbs } from "../render.js"

export function NotFound() {
	hideBreadcrumbs()

	const containerEl = document.querySelector(".container")

	const notFoundWrapper = document.createElement("div")
	notFoundWrapper.classList.add("notFound")

	const h1 = document.createElement("h1")
	const homeLink = document.createElement("a")
	h1.innerHTML = "Error 404"
	homeLink.setAttribute("href", "#users")
	homeLink.innerHTML = "Home page"

	notFoundWrapper.appendChild(h1)
	notFoundWrapper.appendChild(homeLink)

	containerEl.appendChild(notFoundWrapper)
}
