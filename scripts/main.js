import {
  fetchBizarreries,
  fetchParks,
  fetchWeather,
  getCurrentGPS,
  setCurrentGPS,
  getPosition,
} from "./data/dataAccess.js";
import { fetchEateries } from "./data/dataAccess.js";
import { HolidayRoad } from "./HolidayRoad.js";

const applicationElement = document.querySelector("#container");

applicationElement.addEventListener("stateChanged", (customEvent) => {
  renderApp();
});

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
      .then(() => {
        applicationElement.innerHTML = HolidayRoad();
      });
  });
};

renderApp();
