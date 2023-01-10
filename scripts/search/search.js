const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let eateries = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  eateries.forEach(eatery => {
    const isVisible = eatery.businessName.toLowerCase().includes(value)
        eatery.element.classList.toggle("hide", !isVisible)
  })
})

fetch("http://holidayroad.nss.team/eateries")
  .then(res => res.json())
  .then(data => {
   eateries = data.map(eatery =>{
    const card = userCardTemplate.content.cloneNode(true).children[0]
    const header = card.querySelector("[data-header]")
    const body = card.querySelector("[data-body]")
    header.textContent = eatery.businessName
    body.textContent = eatery.id
    userCardContainer.append(card)
    return { Eatery: eatery.businessName, ID: eatery.id, element: card }

  })
})