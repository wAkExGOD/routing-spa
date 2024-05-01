import { getUsers } from "../helpers.js"
import { renderBreadcrumbs, setDataLoading } from "../render.js"

export async function Home() {
	renderBreadcrumbs()
	
	const containerEl = document.querySelector(".container")

	setDataLoading(true)
	const users = await getUsers()
	setDataLoading(false)

	const h1 = document.createElement("h1")
	const usersWrapper = document.createElement("div")
	h1.innerHTML = "Users"
	usersWrapper.classList.add("cards")

	users
		.map((user) => {
			const userEl = document.createElement("a")
			userEl.setAttribute("href", `#users/${user.id}/albums`)
			userEl.classList.add("card")

			userEl.innerHTML = `
				<h2 class="username">${user.username}</h2>
				<div class="name">Name: ${user.name}</div>
				<div class="email">Email: ${user.email}</div>
			`

			return userEl
		})
		.forEach((userEl) => usersWrapper.appendChild(userEl))

	containerEl.appendChild(h1)
	containerEl.appendChild(usersWrapper)
}
