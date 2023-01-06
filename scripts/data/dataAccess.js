import { keys } from "../Settings.js";

const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`;

const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarreries: [],
  selectedPark: {},
  selectedEatery: {},
  weather: []
};

export const fetchParks = () => {
  return fetch(`${parksURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.parks = data.data;
    });
};

export const fetchWeather = (lat, lon) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keys.weatherKey}&units=imperial`;
  return fetch(`${weatherURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.weather = data.list;
    });
};

export const fetchEateries = () => {
  return fetch(`http://holidayroad.nss.team/eateries`)
  .then((response) => response.json())
  .then((data) => {
    applicationState.eateries = data
  });
};

export const fetchBizarreries = () => {
  return fetch(`http://holidayroad.nss.team/bizarreries`)
  .then((response) => response.json())
  .then((data) => {
    applicationState.bizarreries = data
  })
}

export const getParks = () => {
  return applicationState.parks.map((park) => ({ ...park }));
};

export const getWeather = () => {
  return applicationState.weather.map((w) => ({ ...w }));
};

export const getSelectedPark = () => {
  return { ...applicationState.selectedPark };
};

export const getEateries = () => {
  return applicationState.eateries.map((eatery) => ({...eatery}));
}

export const getSelectedEatery = () => {
  return { ...applicationState.selectedEatery };
}

export const getBizarreries = () => {
  return applicationState.bizarreries.map(arr =>({...arr}))
}

export const setSelectedPark = (parkObject) => {
  applicationState.selectedPark = parkObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedEatery = (eateryObject) => {
  applicationState.selectedEatery = eateryObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
}