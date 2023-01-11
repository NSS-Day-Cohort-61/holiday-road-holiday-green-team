import { getEateries } from "../data/dataAccess.js"

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let searchEateries = []




export const renderEateries = () => {

    const eateries = getEateries()

   searchEateries = eateries.map(eatery =>{
    const card = userCardTemplate.content.cloneNode(true).children[0]
    const header = card.querySelector("[data-header]")
    const body = card.querySelector("[data-body]")
    header.textContent = eatery.businessName
    body.textContent = eatery.id
    userCardContainer.append(card)
    return { businessName: eatery.businessName, id: eatery.id, element: card }

  })}
renderEateries()

export const searchInputBox = () => {
  let html = `
  <div id="searchFunction">
  <div class="search-wrapper">
    <label for="search">Search</label>
  </div>
    <input type="search" id="search" data-search>
  </div>
  <div class="user-cards" data-user-cards-container></div>
  <template data-user-template>
    <div class="card">
      <div class="header" data-header></div>
      <div class="body" data-body></div>
    </div>
  </template>

  `
  return html
}

document.addEventListener("input", e => {
  
  if(e.target.id === "search") {
  searchEateries.forEach(eatery => {
    const isVisible = eatery.businessName.toLowerCase().includes(value)
        eatery.element.classList.toggle("hide", !isVisible)
  })}
})