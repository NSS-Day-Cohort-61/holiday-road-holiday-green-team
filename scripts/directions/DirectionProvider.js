import {
  getCurrentItinerary,
  setDirectionsParkLocation,
  setDirectionsEateryLocation,
  setDirectionsBizarrerieLocation
} from "../data/dataAccess.js";

const googleURL = `https://maps.googleapis.com/maps/api/geocode/outputFormat?address=Decatur%20AL&key=AIzaSyDxxzn9JmF-yYhjwJG3XkGjWVU94pCEzI8`

export const fetchGoogleLatLon = () => {
  return fetch (`${googleURL}`)
  .then((response) => response.json())
  .then((data) => {
    console.dir("GOOGLE HERE", data)
  })
}












export const showDirections = () => {
  const currentItinerary = getCurrentItinerary();
  const ifStatement =
    Object.keys(currentItinerary.selectedPark).length > 0 &&
    (Object.keys(currentItinerary.selectedBizarrerie).length > 0 ||
      Object.keys(currentItinerary.selectedBizarrerie).length > 0);
  const parkLatLon = [parseFloat(currentItinerary.selectedPark.longitude), parseFloat(currentItinerary.selectedPark.latitude)]
  setDirectionsParkLocation(parkLatLon)
  // fetchGoogleLatLon()
  

  
  // const eateryLatLong = 

  console.dir(currentItinerary.selectedEatery);

  if (ifStatement) {
    return `
    ${currentItinerary.selectedPark.latitude}
    `;
  } else {
    return `
    Select locations to see directions
    `;
  }
};
