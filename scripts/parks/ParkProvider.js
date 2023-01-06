import {
  getParks,
  fetchWeather,
  setSelectedPark,
  getSelectedPark,
} from "../data/dataAccess.js";
import { selectWeather } from "../weather/WeatherProvider.js";

export const ParkList = () => {
  const parks = getParks();
  const selectedPark = getSelectedPark();

  let html = `
          <select id="parks" name="parks">
          <option value="null">Choose a State Park</option>
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
    // const selectedPark = document.querySelector("#selectedPark");
    // const selectedWeather = document.querySelector("#location");
    const chosenPark = parksList.find((park) => park.id == e.target.value);
    setSelectedPark(chosenPark);
    selectedWeather.innerHTML = selectWeather(
      chosenPark.latitude,
      chosenPark.longitude
    );
  }
});
