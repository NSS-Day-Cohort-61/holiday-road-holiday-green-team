import {
  getParks,
  setSelectedPark,
  getSelectedPark,
  fetchWeather
} from "../data/dataAccess.js";
import { enableSaveButton } from "../itineraries/savedItineraries.js";

export const parkDropdown = () => {
  const parks = getParks();
  const selectedPark = getSelectedPark();

  let html = `
          <select id="parks" class="reqInputs" name="parks" onkeyup="${enableSaveButton()}">
          <option value=0>Choose a State Park</option>
      ${parks
        .map((park) => {
          if (park.id === selectedPark.id) {
            return `<option selected value="${park.id}">${park.fullName}</option>`;
          } else {
            return `<option value="${park.id}">${park.fullName}</option>`;
          }
        })
        .join("")}
      </select>
      `;
  return html;
};

export const showSelectedPark = () => {
  const selectedPark = getSelectedPark();
  if (selectedPark.fullName) {
    return `
    <div id="selectedPark">${selectedPark.fullName}</div>
    `;
  } else {
    return `
    <div id="selectedPark"></div>
    `;
  }
};

document.addEventListener("change", (e) => {
  if (e.target.id === "parks") {
    const parksList = getParks();
    const chosenPark = parksList.find((park) => park.id == e.target.value);
    setSelectedPark(chosenPark);
    fetchWeather(chosenPark.latitude, chosenPark.longitude);
  }
});
