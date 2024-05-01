import { PAGES } from "./constants.js"

const containerEl = document.querySelector(".container")

export function router(url) {
  containerEl.innerHTML = ""

  return PAGES.find((p) => p.check(url))?.render(url)
}
