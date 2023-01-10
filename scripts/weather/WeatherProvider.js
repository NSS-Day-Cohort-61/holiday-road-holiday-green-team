import {
  getWeather,
  fetchWeather,
  getCurrentDay,
  setCurrentDay,
} from "../data/dataAccess.js";

export const showSelectedWeather = () => {
  const isNewDay = (currentDay, oldDay) => {
    if (currentDay.getDay() !== oldDay) {
      setCurrentDay(currentDay.getDay());
      return `</div><h2>${currentDay}</h2><div id='weatherRow'>`;
    } else {
      return "";
    }
  };

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weather = getWeather();
  const currentDate = new Date(weather[0].dt_txt);
  const currentDisplayHour = currentDate.getHours();
  const day = currentDate.getDay();
  setCurrentDay(day);
  let html = `<h2>${currentDate}</h2><div id='weatherRow'>`;

  if (currentDisplayHour !== 0) {
    for (let i = 0; i < currentDisplayHour / 3; i++) {
      html += `<ul class="dates"><li class="blank"></li></ul>`;
    }
  }

  html += `
    ${weather
      .map((w) => {
        const d = new Date(`${w.dt_txt}`);
        // const name = month[d.getMonth()];
        const oldDay = getCurrentDay();

        return `
        ${isNewDay(d, oldDay)}
        <div class="var" style="--url: url(http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png")">
          <ul class="dates">
            <li> ${d.getHours()}:00</li>
            <li class="a"></li>
            <li class="big_temp">${Math.round(w.main.temp)}\u00B0F</li>
            <li>${w.weather[0].description}</li>
          </ul>
        </div>`;
      })
      .join("")}`;
  html += "</div>";
  return html;
};
