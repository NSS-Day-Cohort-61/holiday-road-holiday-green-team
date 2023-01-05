import { HolidayRoad } from "./HolidayRoad.js"


const applicationElement = document.querySelector("#container")

export const renderApp = () => {
  applicationElement.innerHTML = HolidayRoad()
}

renderApp()