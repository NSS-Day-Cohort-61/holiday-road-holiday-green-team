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
  currentGPSCityName: [],
  currentSelectedWeather: "park",
  currentDay: "",
  directionsLocations: {
    parkLocation: [],
    eateryLocation: [],
    bizarrerieLocation: [],
  },
  directionsLocationsArray: [[], [], []],
  directions: {},
  travelOrder: ["p", "b", "e"],
  events: [],
};

export const fetchParks = () => {
  if (applicationState.parks.length === 0) {
    return fetch(`${parksURL}`)
      .then((response) => response.json())
      .then((data) => {
        applicationState.parks = data.data;
      });
  }
};

export const fetchWeather = (lat, lon) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keys.weatherKey}&units=imperial`;
  return fetch(`${weatherURL}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("weather data", data);
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

export const fetchEvents = () => {
  if (!applicationState.events.data) {
    return fetch(
      `https://developer.nps.gov/api/v1/events?&pageSize=600&api_key=${keys.npsKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        applicationState.events = data;
      });
  }
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
  const travelOrder = getTravelOrder();
  let reorderedReceivedData = ["", "", ""];

  travelOrder.forEach((item, index) => {
    if (item === "p") {
      reorderedReceivedData[index] =
        receivedData[0].length === 0 ? "" : receivedData[0];
    } else if (item === "b") {
      reorderedReceivedData[index] =
        receivedData[1].length === 0 ? "" : receivedData[1];
    } else if (item === "e") {
      reorderedReceivedData[index] =
        receivedData[2].length === 0 ? "" : receivedData[2];
    } else if (item === "") {
      reorderedReceivedData[index] = "";
    }
  });
  // console.log("received", receivedData);
  // console.log("reordered", reorderedReceivedData);

  reorderedReceivedData.forEach((arr) => {
    if (arr.length > 0) {
      usableData.push(arr);
    }
  });
  // console.log("usable", usableData);

  const inputData = {
    points: usableData,
    vehicle: "car",
  };

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
        // console.log("directions", data);
        if (!data.message) {
          applicationState.directions = setDirections(data.paths[0]);
        } else {
          window.alert("GPS data for this location is weirdly broken");
        }
      })
    );
  }
};

export const setDirections = (data) => {
  let arr1 = [];
  let arr2 = [];
  let arrived = false;
  for (let item of data.instructions) {
    if (item.text !== "Waypoint 1" && !arrived) {
      arr1.push(item);
    } else {
      arrived = true;
      arr2.push(item);
    }
  }
  return [arr1, arr2];
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
          // console.log("gpsdata", data)
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
        // console.log('biz loc', data)
        if (data.results[0].geometry) {
          setDirectionsBizarrerieLocation([
            data.results[0].geometry.location.lng,
            data.results[0].geometry.location.lat,
          ]);
        }
      });
  }
};

export const fetchGPSCityName = () => {
  let googleURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    getCurrentGPS().lat
  },${getCurrentGPS().lon}&key=AIzaSyDxxzn9JmF-yYhjwJG3XkGjWVU94pCEzI8`;

  return fetch(`${googleURL}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("weather gps data!", data);
      applicationState.currentGPSCityName = data.results;
    });
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

export const getEvents = () => {
  return applicationState.events.data.map((event) => ({ ...event }));
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
  return structuredClone(applicationState.directions);
};

export const getTravelOrder = () => {
  return applicationState.travelOrder.slice();
};

export const getGPSCityName = () => {
  return structuredClone(applicationState.currentGPSCityName);
};

export const getCurrentSelectedWeather = () => {
  return applicationState.currentSelectedWeather;
}

export const setSelectedPark = (parkObject) => {
  applicationState.currentItinerary.selectedPark = parkObject;
  // applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedEatery = (eateryObject) => {
  applicationState.currentItinerary.selectedEatery = eateryObject;
  // applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setSelectedBizarrerie = (bizObject) => {
  applicationState.currentItinerary.selectedBizarrerie = bizObject;
  // applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
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
  // console.log('biz loc 2', inputLocation)
  applicationState.directionsLocations.bizarrerieLocation = inputLocation;
  applicationState.directionsLocationsArray[1] = inputLocation;
};

export const setDirectionsEateryLocation = (inputLocation) => {
  applicationState.directionsLocations.eateryLocation = inputLocation;
  applicationState.directionsLocationsArray[2] = inputLocation;
};

// export const setDirections = (data) => {
//   applicationState.directions = data;
// };

export const setTravelOrder = (index, value) => {
  let travelOrder = getTravelOrder();
  for (let i = 0; i < travelOrder.length; i++) {
    if (travelOrder[i] === value) {
      applicationState.travelOrder[i] = "";
    }
  }
  if (index !== -1) {
    applicationState.travelOrder[index] = value;
    // console.log(applicationState.travelOrder);
  }
};

export const setCurrentSelectedWeather = (input) => {
  applicationState.currentSelectedWeather = input;
}

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
