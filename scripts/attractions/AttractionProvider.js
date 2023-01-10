import {
  getCurrentItinerary,
  getMoreDetailsDisplay,
  setMoreDetailsDisplay,
} from "../data/dataAccess.js";

const applicationElement = document.querySelector("#container");

export const showMoreDetails2 = () => {
  return "haha hi";
};

export const showMoreDetails = () => {
  const moreDetailsDisplay = getMoreDetailsDisplay();
  switch (moreDetailsDisplay) {
    case "P":
      return parkDetails();
    case "B":
      return bizarrerieDetails();
    case "E":
      return eateryDetails();
    default:
      return unchosenDisplay();
  }
};

const parkDetails = () => {
  const currentItinerary = getCurrentItinerary();
  const selectedPark = currentItinerary.selectedPark;
  return `
  <h3>${selectedPark.fullName}</h3>
  <p><h4>Address:</h4> ${selectedPark.addresses[0].line1}<br>${selectedPark.addresses[0].city}, ${selectedPark.addresses[0].stateCode} ${selectedPark.addresses[0].postalCode}</p>
  <p><h4>Description:</h4> ${selectedPark.description}</p>
  `;
};

const bizarrerieDetails = () => {
  const currentItinerary = getCurrentItinerary();
  const selectedBizarrerie = currentItinerary.selectedBizarrerie;
  return `
  <h3>${selectedBizarrerie.name}</h3>
  <p><h4>Location:</h4> ${selectedBizarrerie.city}, ${selectedBizarrerie.state}</p>
  <p><h4>Description:</h4> ${selectedBizarrerie.description}</p>
  `;
};

const eateryDetails = () => {
  const currentItinerary = getCurrentItinerary();
  const selectedEatery = currentItinerary.selectedEatery;
  return `
  <h3>${selectedEatery.businessName}</h3>
  <p><h4>Location:</h4> ${selectedEatery.city}, ${selectedEatery.state}</p>
  <p><h4>Description:</h4> ${selectedEatery.description}</p>
  `;
};

const unchosenDisplay = () => {
  return '<h3>Click "Details" to learn more!</h3>';
};

applicationElement.addEventListener("click", (e) => {
  const currentItinerary = getCurrentItinerary();
  if (e.target.id === "parks-btn") {
    if (Object.keys(currentItinerary.selectedPark).length > 1) {
      setMoreDetailsDisplay("P");
    }
  } else if (e.target.id === "biz-btn") {
    if (Object.keys(currentItinerary.selectedBizarrerie).length > 1) {
      setMoreDetailsDisplay("B");
    }
  } else if (e.target.id === "eat-btn") {
    if (Object.keys(currentItinerary.selectedEatery).length > 1) {
      setMoreDetailsDisplay("E");
    }
  }
});
