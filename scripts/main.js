import {
  fetchBizarreries,
  fetchItinerary, 
  fetchParks,
  fetchWeather,
  getCurrentGPS,
  setCurrentGPS,
  getPosition,
  fetchEvents,
  fetchDirections,
  fetchEateryLatLon,
  fetchBizLatLon,
  getDirectionsLocationsArray,
  fetchGPSCityName
} from "./data/dataAccess.js";
import { fetchEateries } from "./data/dataAccess.js";
import { HolidayRoad } from "./HolidayRoad.js";
import { eateryInfo, bizInfo } from "./directions/DirectionProvider.js"

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
    let lat = currentGPS.lat;
    let lon = currentGPS.lon;
    fetchEateries()
    .then(() => fetchBizarreries())
    .then(() => fetchParks())
    .then(() => fetchItinerary())
    .then(() => fetchEateryLatLon(eateryInfo()))
    .then(() => fetchBizLatLon(bizInfo()))
    .then(() => fetchWeather(lat, lon))
    .then(() => fetchEvents())
    .then(() => fetchDirections(getDirectionsLocationsArray()))
    .then(() => fetchGPSCityName())
    .then(() => {
      applicationElement.innerHTML = HolidayRoad();
    })
  });
}

renderApp();
