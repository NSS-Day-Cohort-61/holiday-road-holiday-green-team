import {
  fetchBizarreries,
  fetchItinerary, fetchParks,
  fetchWeather,
  getCurrentGPS,
  setCurrentGPS,
  getPosition,
  fetchEvents,
} from "./data/dataAccess.js";
import { fetchEateries } from "./data/dataAccess.js";
import { HolidayRoad } from "./HolidayRoad.js";

const applicationElement = document.querySelector("#container");

applicationElement.addEventListener("stateChanged", (customEvent) => {
  renderApp();
});

// const renderApp = () => {
//   const promArray = [fetchEateries(), fetchBizarreries(), fetchParks(), fetchItinerary()]
//   Promise.all(promArray)
//     .then(() => {
//       applicationElement.innerHTML = HolidayRoad();
//     })
//     .catch(() => {
//       console.log(`shit happens...`)
//     })
// };

const renderApp = () => {
  getPosition().then((position) => {
    if (Object.keys(getCurrentGPS()).length === 0) {
      setCurrentGPS(position.coords.latitude, position.coords.longitude);
    }
    const currentGPS = getCurrentGPS();
    const lat = currentGPS.lat;
    const lon = currentGPS.lon;
    fetchEateries()
    .then(() => fetchBizarreries())
    .then(() => fetchParks())
    .then(() => fetchWeather(lat, lon))
    .then(() => fetchItinerary())
    .then(() => fetchEvents())
    .then(() => {
      applicationElement.innerHTML = HolidayRoad();
    })
  });
}

renderApp();
