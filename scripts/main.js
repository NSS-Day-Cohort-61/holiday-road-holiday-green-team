import { fetchBizarreries, fetchParks, getBizarreries } from "./data/dataAccess.js";
import { fetchEateries } from "./data/dataAccess.js"
import { HolidayRoad } from "./HolidayRoad.js";

const applicationElement = document.querySelector("#container");

applicationElement.addEventListener(
  "stateChanged",
  customEvent => {
    renderApp()
  }
)

// const renderApp = () => {
//   const promArray = [fetchEateries(), fetchBizarreries(), fetchParks()]
//   Promise.all(promArray)
//     .then(() => {
//       applicationElement.innerHTML = HolidayRoad();
//     })
//     .catch(() => {
//       console.log(`shit happens`)
//     })
// };

const renderApp = () => {
  fetchEateries()
  .then(() => fetchBizarreries())
  .then(() => fetchParks())
  .then(() => {
    applicationElement.innerHTML = HolidayRoad();
  })
}


renderApp();
*/