import {
  getCurrentItinerary,
  getDirectionsLocations,
  fetchDirections,
  setDirections,
  getDirections,
  getDirectionsLocationsArray,
  setTravelOrder,
  getTravelOrder,
} from "../data/dataAccess.js";

const applicationElement = document.querySelector("#container");

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
      <p class="bold">${
        Math.round(direction.distance * 0.000621371 * 10) / 10
      } miles</p> 
      `;
      })
      .join("")}
      </div>`;
  } else {
    return "bye";
  }
};

// Directions Dropdown

export const directionsDropdown = () => {
  const dirArr = [1, 2, 3];
  const letterArr = ['p', 'b', 'e']
  const travelOrder = getTravelOrder();
  let outStr = "";
  for (let j = 1; j <= travelOrder.length; j++) {
    outStr += `<select id="directionsDropdown--${j}" name="directions">
    <option selected disabled value="0">Not selected for directions</option>`;
    for (let i = 1; i <= travelOrder.length; i++) {
      if (letterArr[j-1] === travelOrder[i-1]) {
        outStr += `<option disabled selected value="${i}">Destination ${i}</option>`
      } else if (travelOrder[i - 1].length > 0) {
        outStr += `<option disabled value="${i}">Destination ${i}</option>`;
      } else {
        outStr += `<option value="${i}">Destination ${i}</option>`;
      }
    }
    outStr += `<option value='4'>Reset this selection</option></select>`
  }
  
  return outStr;

  // return dirArr
  //   .map((num) => {
  //     let html = `<select id="directionsDropdown--${num}" name="directions" >
  //   <option value="0">Not selected for directions</option>`;
  //     for (let i = 0; i < travelOrder.length; i++) {
  //       if (travelOrder[i].length > 0) {
  //         html += `<option disabled value="${i + 1}">Destination ${
  //           i + 1
  //         }</option>`;
  //       } else {
  //         html += `<option value="${i + 1}">Destination ${i + 1}</option>`;
  //       }
  //     }
  //     html += "<option value='4'>Reset this selection</option></select>";
  //     return html;
  //   })
  //   .join("");
};

const resetChecker = (input) => {
  let travelOrder = getTravelOrder();
  for (let i = 0; i < travelOrder.length; i++) {
    if (travelOrder[i] === input) {
      setTravelOrder(i, "");
    }
  }
};

applicationElement.addEventListener("change", (e) => {
  if (e.target.id.startsWith("directionsDropdown")) {
    let [, clickedDropdown] = e.target.id.split("--");
    clickedDropdown = parseInt(clickedDropdown);
    if (clickedDropdown === 1) {
      if (e.target.value === "4") {
        resetChecker("p");
      } else {
        setTravelOrder(parseInt(e.target.value) - 1, "p");
      }
    }
    if (clickedDropdown === 2) {
      if (e.target.value === "4") {
        resetChecker("b");
      } else {
        setTravelOrder(parseInt(e.target.value) - 1, "b");
      }
    }
    if (clickedDropdown === 3) {
      if (e.target.value === "4") {
        resetChecker("e");
      } else {
        setTravelOrder(parseInt(e.target.value) - 1, "e");
      }
    }
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
