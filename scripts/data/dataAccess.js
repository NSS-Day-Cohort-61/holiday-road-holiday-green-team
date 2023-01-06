import { keys } from "../Settings.js";

const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`;


//https://openweathermap.org/forecast5 <--- weather API endpoint


const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarreries: [],
};

export const fetchParks = () => {
  return fetch(`${parksURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.parks = data.data;
    });
};

export const getParks = () => {
  for (let park of applicationState.parks) {
    console.log(park.fullName)
  }
  return applicationState.parks.map((park) => ({ ...park }));
};

export const fetchWeather = (lat,lon) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keys.weatherKey}&units=imperial`
  return fetch(`${weatherURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.weather = data.data;
    });
};

export const getEateries = () => {
  for (const eatery of applicationState.eateries) {
    console.log(eatery.businessName)
  }
  return applicationState.eateries.map((eatery) => ({...eatery}));
}

export const fetchEateries = () => {
  return fetch(`http://holidayroad.nss.team/eateries`)
  .then((response) => response.json())
  .then((data) => {
    applicationState.eateries = data
  });
};

export const getBizarreries = () => {
  return applicationState.bizarreries.map(arr =>({...arr}))
}

export const fetchBizarreries = () => {
  return fetch(`http://holidayroad.nss.team/bizarreries`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    applicationState.bizarreries = data
  })
}
