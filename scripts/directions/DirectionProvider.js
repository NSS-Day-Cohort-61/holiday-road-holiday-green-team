import {
  getCurrentItinerary,
  getDirectionsLocations,
  getDirections,
  getDirectionsLocationsArray,
  setTravelOrder,
  getTravelOrder,
  getSelectedPark,
  getSelectedBizarrerie,
  getSelectedEatery,
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

  // console.dir(getDirectionsLocations());
  const dirLoc = getDirectionsLocations();
  const dirLocArray = [
    dirLoc.parkLocation,
    dirLoc.bizarrerieLocation,
    dirLoc.eateryLocation,
  ];
  // console.log("dirLocArray", dirLocArray);
};

const getLegsLengths = () => {
  const allDirections = getDirections();
  let legsLengths = [0, 0];
  if (allDirections.length > 0) {
    for (let item of allDirections[0]) {
      legsLengths[0] += item.distance;
    }
    for (let item of allDirections[1]) {
      legsLengths[1] += item.distance;
    }
  }
  // console.log("directions1", allDirections[0]);
  // console.log("directions2", allDirections[1]);
  return legsLengths;
};

export const showDirections = () => {
  const travelOrder = getTravelOrder();
  const allDirections = getDirections();

  let clickedDropdowns = 0;
  travelOrder.forEach((to) => {
    if (to.length > 0) {
      clickedDropdowns++;
    }
  });

  let passable = 0;
  getDirectionsLocationsArray().forEach((dl) => {
    if (dl.length > 0) {
      passable++;
    }
  });

  if (clickedDropdowns > 1 && passable > 1) {
    let outHTML = "";
    const legsLengths = getLegsLengths();
    let locationNames = ["", "", ""];
    // let travelOrder = getTravelOrder();
    let parkName = getSelectedPark().fullName;
    let bizarrerieName = getSelectedBizarrerie().name;
    let eateryName = getSelectedEatery().businessName;
    travelOrder.forEach((item, index) => {
      if (item === "p") locationNames[index] = parkName;
      if (item === "b") locationNames[index] = bizarrerieName;
      if (item === "e") locationNames[index] = eateryName;
    });
    let directions = allDirections[0];
    let index = 0;
    if (directions) {
      outHTML += `
      <h3>Begin at ${locationNames[index]}</h3>
      <p>Distance: ${Math.round(legsLengths[index] * 0.000621371)} miles</p>
      <div id="instructions">
      ${directions
        .map((direction) => {
          return `
        <p class="dir-text">${direction.text}</p>
        <p class="bold">${
          Math.round(direction.distance * 0.000621371 * 10) / 10
        } miles</p> 
        `;
        })
        .join("")}
        </div><h3>Arrive at ${locationNames[index + 1]}</h3>
    `;
      directions = allDirections[1];
      index = 1;

      outHTML += `
        <p>Distance: ${Math.round(legsLengths[index] * 0.000621371)} miles</p>
        <div id="instructions">
        
        ${directions
          .map((direction) => {
            return `
          <p class="dir-text">${direction.text}</p>
          <p class="bold">${
            Math.round(direction.distance * 0.000621371 * 10) / 10
          } miles</p> 
          `;
          })
          .join("")}
          </div><h3>Arrive at ${locationNames[index + 1]}</h3>
      `;
    }
    return outHTML;
  } else {
    return "<p style='text-align: center'>Select your destinations and route options to see directions</p>";
  }
};

// Directions Dropdown

export const directionsDropdown = () => {
  // const dirArr = [1, 2, 3];
  const letterArr = ["p", "b", "e"];
  const travelOrder = getTravelOrder();
  let html = "";
  for (let j = 1; j <= travelOrder.length; j++) {
    html += `<select class="dirDrop" id="directionsDropdown--${j}" name="directions">
    <option selected disabled value="0">Not selected for directions</option>`;
    for (let i = 1; i <= travelOrder.length; i++) {
      if (letterArr[j - 1] === travelOrder[i - 1]) {
        html += `<option disabled selected value="${i}">Destination ${i}</option>`;
      } else if (travelOrder[i - 1].length > 0) {
        html += `<option disabled value="${i}">Destination ${i}</option>`;
      } else {
        html += `<option value="${i}">Destination ${i}</option>`;
      }
    }
    html += `<option value='4'>Reset this selection</option></select>`;
  }
  return html;
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
