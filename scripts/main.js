import { fetchEateries } from "./data/dataAccess.js"
import { HolidayRoad } from "./HolidayRoad.js"


const applicationElement = document.querySelector("#container")

export const renderApp = () => {
  fetchEateries() 
  .then(() => {
    applicationElement.innerHTML = HolidayRoad()
  })
}

renderApp()