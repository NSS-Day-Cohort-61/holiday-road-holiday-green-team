import { keys } from "../Settings.js";

const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`;

export const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarreries: [],
  selectedPark: {},
  selectedEatery: {},
  selectedBizarrerie: {},
  currentItinerary: {
    selectedPark: {},
    selectedBizarrerie: {},
    selectedEatery: {}
  },
  weather: [],
  savedItineraries: []
};

//make sendItin, fetchItin,


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
  return { ...applicationState.currentItinerary.selectedPark };
};

export const getSelectedBizarrerie = () => {
  return { ...applicationState.currentItinerary.selectedBizarrerie };
};

export const getEateries = () => {
  return applicationState.eateries.map((eatery) => ({...eatery}));
}

export const getSelectedEatery = () => {
  return { ...applicationState.currentItinerary.selectedEatery };
}

export const getBizarreries = () => {
  return applicationState.bizarreries.map(arr =>({...arr}))
}

export const setSelectedPark = (parkObject) => {
  applicationState.currentItinerary.selectedPark = parkObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedEatery = (eateryObject) => {
  applicationState.currentItinerary.selectedEatery = eateryObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
}

export const setSelectedBizarrerie = (bizObject) => {
  applicationState.currentItinerary.selectedBizarrerie = bizObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

const API = "http://localhost:8088"

export const sendItinerary = (currentItin) => {
  const fetchOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(currentItin)
  }
  const applicationElement = document.querySelector("#container")
  return fetch(`${API}/itineraries`, fetchOptions)
    .then(response => response.json())
    .then(
      () => {
          applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
      }
    )
}



export const fetchItinerary = () => {
  return fetch(`${API}/itineraries`)
    .then(response => response.json())
    .then(
      (data) => {
        applicationState.savedItineraries = data
      }
    )
}

export const getItineraries = () => {
  return [...applicationState.savedItineraries]
}

export const getCurrentItinerary = () => {
  return {...applicationState.currentItinerary}
}



