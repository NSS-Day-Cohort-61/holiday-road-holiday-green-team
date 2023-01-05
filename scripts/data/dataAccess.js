const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
import { keys } from "../Settings.js";
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`;


//https://openweathermap.org/forecast5 <--- weather API endpoint

const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarraries: [],
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
