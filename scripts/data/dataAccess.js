import { keys } from "../Settings.js";

const apiURL = "http://localhost:8088";
const applicationElement = document.querySelector("#container");
const parksURL = `https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}&limit=470`;
const graphHopperURL = `https://graphhopper.com/api/1/route?key=a0f73201-f299-4f9e-b41b-3cd6ee4bade3`;

export const applicationState = {
  itineraries: [],
  parks: [],
  eateries: [],
  bizarreries: [],
  currentItinerary: {
    selectedPark: {},
    selectedEatery: {},
    selectedBizarrerie: {},
  },

  weather: [],
  savedItineraries: [],
  moreDetailsDisplay: "N",
  currentGPS: {},
  currentDay: "",
  directionsLocations: {
    parkLocation: [],
    eateryLocation: [],
    bizarrerieLocation: [],
  },
  directionsLocationsArray: [[], [], []],
  directions: {},
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
      applicationState.eateries = data;
    });
};

export const fetchBizarreries = () => {
  return fetch(`http://holidayroad.nss.team/bizarreries`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.bizarreries = data;
    });
};

export const fetchItinerary = () => {
  return fetch(`${apiURL}/itineraries`)
    .then((response) => response.json())
    .then((data) => {
      applicationState.savedItineraries = data;
    });
};

export const fetchDirections = (receivedData) => {
  const usableData = [];
  receivedData.forEach((arr) => {
    if (arr.length > 0) {
      usableData.push(arr);
    }
  });

  const inputData = {
    // points: [
    //   [-96.04091435407086, 41.240088020828075],
    //   [-96.04873620250179, 41.2476353253116],
    // ],
    points: usableData,
    vehicle: "car",
  };

  console.log("usableData BABY!", usableData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  };
  if (usableData.length > 1) {
    return fetch(`${graphHopperURL}`, fetchOptions).then((response) =>
      response.json().then((data) => {
        applicationState.directions = data.paths[0];
      })
    );
  }
};

export const fetchEateryLatLon = (address) => {
  if (address !== 0) {
    const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDxxzn9JmF-yYhjwJG3XkGjWVU94pCEzI8`;

    if (
      Object.keys(applicationState.currentItinerary.selectedEatery).length > 0
    ) {
      return fetch(`${googleURL}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length === 0) {
            let selectedEateryName = `${applicationState.currentItinerary.selectedEatery.city} ${applicationState.currentItinerary.selectedEatery.state}`;
            selectedEateryName = selectedEateryName.replaceAll(" ", "%20");
            fetchEateryLatLon(selectedEateryName);
          } else {
            setDirectionsEateryLocation([
              data.results[0].geometry.location.lng,
              data.results[0].geometry.location.lat,
            ]);
          }
        });
    }
  }
};

export const fetchBizLatLon = (address) => {
  const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDxxzn9JmF-yYhjwJG3XkGjWVU94pCEzI8`;

  if (
    Object.keys(applicationState.currentItinerary.selectedBizarrerie).length > 0
  ) {
    return fetch(`${googleURL}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0].geometry) {
          setDirectionsBizarrerieLocation([
            data.results[0].geometry.location.lng,
            data.results[0].geometry.location.lat,
          ]);
        }
      });
  }
};

export const getParks = () => {
  return applicationState.parks.map((park) => ({ ...park }));
};

export const getWeather = () => {
  return applicationState.weather.map((w) => ({ ...w }));
};

export const getEateries = () => {
  return applicationState.eateries.map((eatery) => ({ ...eatery }));
};

export const getBizarreries = () => {
  return applicationState.bizarreries.map((arr) => ({ ...arr }));
};

export const getSelectedPark = () => {
  return { ...applicationState.currentItinerary.selectedPark };
};

export const getSelectedBizarrerie = () => {
  return { ...applicationState.currentItinerary.selectedBizarrerie };
};

export const getSelectedEatery = () => {
  return { ...applicationState.currentItinerary.selectedEatery };
};

export const getMoreDetailsDisplay = () => {
  return applicationState.moreDetailsDisplay;
};

export const getItineraries = () => {
  return [...applicationState.savedItineraries];
};

export const getCurrentItinerary = () => {
  return { ...applicationState.currentItinerary };
};

export const getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getCurrentDay = () => {
  return applicationState.currentDay;
};

export const getCurrentGPS = () => {
  return { ...applicationState.currentGPS };
};

export const getDirectionsLocations = () => {
  return { ...applicationState.directionsLocations };
};

export const getDirectionsLocationsArray = () => {
  return structuredClone(applicationState.directionsLocationsArray);
};

export const getDirections = () => {
  return { ...applicationState.directions };
};

export const setSelectedPark = (parkObject) => {
  applicationState.currentItinerary.selectedPark = parkObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedEatery = (eateryObject) => {
  applicationState.currentItinerary.selectedEatery = eateryObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedBizarrerie = (bizObject) => {
  applicationState.currentItinerary.selectedBizarrerie = bizObject;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setMoreDetailsDisplay = (detailsState) => {
  applicationState.moreDetailsDisplay = detailsState;
  applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setCurrentGPS = (lat, lon) => {
  applicationState.currentGPS.lat = lat;
  applicationState.currentGPS.lon = lon;
};

export const setCurrentDay = (day) => {
  applicationState.currentDay = day;
};

export const setDirectionsParkLocation = (inputLocation) => {
  applicationState.directionsLocations.parkLocation = inputLocation;
  applicationState.directionsLocationsArray[0] = inputLocation;
};

export const setDirectionsBizarrerieLocation = (inputLocation) => {
  applicationState.directionsLocations.bizarrerieLocation = inputLocation;
  applicationState.directionsLocationsArray[1] = inputLocation;
};

export const setDirectionsEateryLocation = (inputLocation) => {
  applicationState.directionsLocations.eateryLocation = inputLocation;
  applicationState.directionsLocationsArray[2] = inputLocation;
};

export const setDirections = (data) => {
  applicationState.directions = data;
};

export const sendItinerary = (currentItin) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentItin),
  };

  return fetch(`${apiURL}/itineraries`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};
