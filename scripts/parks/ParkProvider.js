import {
  getParks,
  setSelectedPark,
  getSelectedPark,
  fetchWeather,
  getWeather,
  setCurrentGPS,
  setDirectionsParkLocation
} from "../data/dataAccess.js";

const applicationElement = document.querySelector("#container");

export const parkDropdown = () => {
  const parks = getParks();
  const selectedPark = getSelectedPark();

  let html = `
          <select id="parks" class="reqInputs" name="parks" >
          <option value="0">Select a State Park</option>
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
    // const weather = getWeather();
    // const currentTime = new Date(weather[0].dt_txt);
    // const currentDisplayHour = currentTime.getHours();
    // const cnt = Math.floor(40 - currentDisplayHour / 3);
    // setCurrentGPS(chosenPark.latitude, chosenPark.longitude)
    // const parkLatLon = [
    //   parseFloat(chosenPark.longitude),
    //   parseFloat(chosenPark.latitude),
    // ];
    // setDirectionsParkLocation(parkLatLon);
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
