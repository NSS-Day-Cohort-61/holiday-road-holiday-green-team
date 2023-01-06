const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
import { keys } from "../Settings.js";
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`;

const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarraries: [],
  selectedPark: {},
  weather: []
};

export const fetchParks = () => {
  return fetch(`${parksURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.parks = data.data;
    });
};

export const getParks = () => {
  return applicationState.parks.map((park) => ({ ...park }));
};

export const fetchWeather = (lat, lon) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keys.weatherKey}&units=imperial`;
  return fetch(`${weatherURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.weather = data.list;
    });
};

export const getWeather = () => {
  return applicationState.weather.map((w) => ({ ...w }));
};

export const setSelectedPark = (parkObject) => {
  applicationState.selectedPark = parkObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const getSelectedPark = () => {
  return { ...applicationState.selectedPark };
};
