import {
  getCurrentItinerary,
  getDirectionsLocations,
  fetchDirections,
  setDirections,
  getDirections,
  getDirectionsLocationsArray,
} from "../data/dataAccess.js";

// let address = "Decatur%20AL";
// address = "Big%20Bob%20Gibson%20Bar-B-Que";

export const eateryInfo = () => {
  const currentItinerary = getCurrentItinerary();
  if (Object.keys(currentItinerary.selectedEatery).length > 0) {
    return currentItinerary.selectedEatery.businessName.replaceAll(" ", "%20");
  } else {
    return 0;
  }
};

export const bizInfo = () => {
  const currentItinerary = getCurrentItinerary();
  let selectedBizarrerie = `${currentItinerary.selectedBizarrerie.city} ${currentItinerary.selectedBizarrerie.state}`;
  return selectedBizarrerie.replaceAll(" ", "%20");
};

export const setGPSLocations = () => {
  const currentItinerary = getCurrentItinerary();

  console.dir(getDirectionsLocations());
  const dirLoc = getDirectionsLocations();
  const dirLocArray = [
    dirLoc.parkLocation,
    dirLoc.bizarrerieLocation,
    dirLoc.eateryLocation,
  ];
  console.log("dirLocArray", dirLocArray);
};

export const showDirections = () => {
  const currentItinerary = getCurrentItinerary();
  const directionsLocationsArray = getDirectionsLocationsArray();
  let clickedDropdowns = 0;
  directionsLocationsArray.forEach((dla) => {
    if (dla.length > 1) {
      clickedDropdowns++;
    }
  });

  const directions = getDirections();
  if (clickedDropdowns > 1) {
    console.log("directions", directions);
    return `
    <p>Distance: ${Math.round(directions.distance * 0.000621371)} miles</p>
    <div id="instructions">
    <p>Begin at ${directions.instructions[0].street_name}</p><p></p>
    ${directions.instructions
      .map((direction) => {
        return `
      <p class="dir-text">${direction.text}</p>
      <p class="bold">${Math.round(direction.distance * 0.000621371 * 10)/10} miles</p> 
      `;
      })
      .join("")}
      </div>`;
  } else {
    return "bye";
  }
};

// current thinking: we need to send dirLocArray to fetchDirections in main.js.
