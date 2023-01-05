import { keys } from "../Settings.js";

const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container")
const parksURL = `developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`


const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarraries: []
}

export const fetchParks = () => {
  return fetch(`${parksURL}`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.parks = data.data
    })
}

export const getParks = () => {
  for (let park of applicationState.parks) {
    console.log(park.fullname)
  }
  return applicationState.parks.map((park) => ({...park}))
}

export const fetchBizarraries = () => {
  return fetch(`http://holidayroad.nss.team/bizarreries`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.bizarraries = data
    })
}

export const getBizarraries = () => {
  for (const bizarrarie of applicationState.bizarraries) {
    console.log(bizarrarie.name)
  }
  return applicationState.bizarraries
}

export const fetchEateries = () => {
  return fetch(`http://holidayroad.nss.team/eateries`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.eateries = data
    })
}

export const getEateries = () => {
  for (const eatery of applicationState.eateries) {
    console.log(eatery.businessName)
  }
  return applicationState.eateries
}