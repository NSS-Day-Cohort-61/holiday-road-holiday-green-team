import {
  getWeather,
  getCurrentDay,
  setCurrentDay,
  getGPSCityName,
  getCurrentSelectedWeather,
  setCurrentSelectedWeather,
  setCurrentGPS,
  getDirectionsLocations,
} from "../data/dataAccess.js";

const applicationElement = document.querySelector("#container");

export const showSelectedWeather = () => {
  const isNewDay = (currentDay, oldDay) => {
    if (currentDay.getDay() !== oldDay) {
      setCurrentDay(currentDay.getDay());
      return `</div><h3>${currentDay.toDateString()}</h3><div id='weatherRow'>`;
    } else {
      return "";
    }
  };

  const weather = getWeather();
  const cityName =
    getGPSCityName()[3].formatted_address.length <
    getGPSCityName()[4].formatted_address.length
      ? getGPSCityName()[4].formatted_address
      : getGPSCityName()[4].formatted_address;
  const currentDate = new Date(weather[0].dt * 1000);
  const currentDisplayHour = currentDate.getHours();
  const day = currentDate.getDay();
  setCurrentDay(day);
  let html = `<h2>Weather for ${cityName}</h2><h3>${currentDate.toDateString()}</h3><div id='weatherRow'>`;

  if (currentDisplayHour !== 0) {
    for (let i = 0; i < currentDisplayHour / 3; i++) {
      html += `<ul class="dates"><li class="blank"></li></ul>`;
    }
  }

  html += `
    ${weather
      .map((w) => {
        const d = new Date(w.dt * 1000);
        const oldDay = getCurrentDay();
        const temp = Math.round(w.main.temp);
        let tempColor;
        if (temp < 35) {
          tempColor = `0, 20, 255`;
        } else if (temp < 55) {
          tempColor = `0, 120, 255`;
        } else if (temp < 75) {
          tempColor = `0, 180, 255`;
        } else if (temp < 85) {
          tempColor = `0, 255, 255`;
        } else {
          tempColor = `245, 17, 1`;
        }
        let time = d.getHours();
        let displayTime = time % 12;
        if (displayTime === 0) displayTime = 12;
        let amPM = time / 12 >= 1 ? "PM" : "AM";

        return `
        ${isNewDay(d, oldDay)}
        <div class="var" style="--url: url(http://openweathermap.org/img/wn/${
          w.weather[0].icon
        }@2x.png); --color: ${tempColor};" >
          <ul class="dates">
            <li> ${displayTime} ${amPM}</li>
            <li class="a"></li>
            <li class="big_temp" style="">${Math.round(w.main.temp)}\u00B0F</li>
            <li>${w.weather[0].description}</li>
          </ul>
        </div>`;
      })
      .join("")}`;
  html += "</div>";
  return html;
};

// Weather select radio HTML

export const selectWeatherLocation = () => {
  let html = "";
  const currentSelectedWeather = getCurrentSelectedWeather();
  if (currentSelectedWeather === "park") {
    html += `<div><input type="radio" id="park--weather" name="weatherSelect" checked="checked"><label for="park--weather">Show Weather</label></div>
            <div><input type="radio" id="bizarrerie--weather" name="weatherSelect"><label for="bizarrerie--weather">Show Weather</label></div>
            <div><input type="radio" id="eatery--weather" name="weatherSelect"><label for="eatery--weather">Show Weather</label></div>`;
  } else if (currentSelectedWeather === "bizarrerie") {
    html += `<div><input type="radio" id="park--weather" name="weatherSelect"><label for="park--weather">Show Weather</label></div>
            <div><input type="radio" id="bizarrerie--weather" name="weatherSelect" checked="checked"><label for="bizarrerie--weather">Show Weather</label></div>
            <div><input type="radio" id="eatery--weather" name="weatherSelect"><label for="eatery--weather">Show Weather</label></div>`;
  } else if (currentSelectedWeather === "eatery") {
    html += `<div><input type="radio" id="park--weather" name="weatherSelect"><label for="park--weather">Show Weather</label></div>
            <div><input type="radio" id="bizarrerie--weather" name="weatherSelect"><label for="bizarrerie--weather">Show Weather</label></div>
            <div><input type="radio" id="eatery--weather" name="weatherSelect" checked="checked"><label for="eatery--weather">Show Weather</label></div>`;
  }
  return html;
};

// Weather select event listener

applicationElement.addEventListener("change", (event) => {
  if (event.target.name === "weatherSelect") {
    let [selectedTab] = event.target.id.split("--");
    setCurrentSelectedWeather(selectedTab);

    setWeatherGPS();
  }
});

export const setWeatherGPS = () => {
  const selectedTab = getCurrentSelectedWeather();
  const allLocs = getDirectionsLocations();
  if (selectedTab && allLocs) {
    if (selectedTab === "bizarrerie" && allLocs.bizarrerieLocation.length > 0) {
      setCurrentGPS(
        allLocs.bizarrerieLocation[1],
        allLocs.bizarrerieLocation[0]
      );
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (selectedTab === "eatery" && allLocs.eateryLocation.length > 0) {
      setCurrentGPS(allLocs.eateryLocation[1], allLocs.eateryLocation[0]);
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    } else if (selectedTab === "park" && allLocs.parkLocation.length > 0) {
      setCurrentGPS(allLocs.parkLocation[1], allLocs.parkLocation[0]);
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
  }
};
