import { fetchParks } from "./data/dataAccess.js";
import { fetchEateries } from "./data/dataAccess.js"
import { HolidayRoad } from "./HolidayRoad.js";

const applicationElement = document.querySelector("#container");

applicationElement.addEventListener(
  "stateChanged",
  customEvent => {
    renderApp()
  }
)

const renderApp = () => {
  fetchEateries()
  .then(() => {
    fetchParks()
  })
  .then(() => {
    applicationElement.innerHTML = HolidayRoad();
  });
};

renderApp();