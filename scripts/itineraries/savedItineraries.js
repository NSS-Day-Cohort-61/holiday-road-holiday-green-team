import {
  applicationState,
  getCurrentItinerary,
  getItineraries,
  sendItinerary,
  setCurrentGPS,
  setSelectedBizarrerie,
  setSelectedPark,
  setSelectedEatery,
  setDirectionsParkLocation,
} from "../data/dataAccess.js";

//Do I need to save & match IDs?
//Does does event listener need anything other than to run the function to display?
export const savedItineraryHTML = () => {
  const itineraries = getItineraries();
  let html = `<article class="savedItins">
        <ol>`;
  html += `
    ${itineraries
      .map((itinerary) => {
        return `<li id="itinId--${itinerary.id}" class="savedSingles itinId--${itinerary.id}"><ul class="itinId--${itinerary.id}">
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Park:</strong> ${itinerary.selectedPark.fullName}</li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Bizarrerie:</strong> ${itinerary.selectedBizarrerie.name}</li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Eatery:</strong> ${itinerary.selectedEatery.businessName}</li>
                </ul></li><br>
            `;
      })
      .join("")}`;
  html += `</ol> `;
  return html;
};

const applicationElement = document.querySelector("#container");

applicationElement.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "save") {
    const selectedItinerary = getCurrentItinerary();
    sendItinerary(selectedItinerary);
  }
});

// Function to make a saved itinerary clickable.
// When clicked, the corresponding park, eatery, and bizarrerie should reappear in their respective input fields.
// Function will have to reference the savedItineraries in dataAccess.
// 1. identify the park, eatery, bizarrerie IDs in the saved section.
// 2. loop through each API and find the matching IDs.
// 3. set the select/option fields (which should trigger/populate the preview fields?)
//look thru savedItineraries and reset applicationstate.currentItinerary

document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.className.startsWith("itinId--")) {
    const [, savedItinId] = clickEvent.target.className.split("--");
    const itineraries = getItineraries();
    for (const itin of itineraries) {
      if (itin.id === parseInt(savedItinId)) {
        // applicationState.currentItinerary = itin
        setSelectedPark(itin.selectedPark);
        setSelectedEatery(itin.selectedEatery);
        setSelectedBizarrerie(itin.selectedBizarrerie);
        setCurrentGPS(itin.selectedPark.latitude, itin.selectedPark.longitude);
        const parkLatLon = [
          parseFloat(itin.selectedPark.longitude),
          parseFloat(itin.selectedPark.latitude),
        ];
        setDirectionsParkLocation(parkLatLon)
        break;
      }
    }
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
