import {
  getWeather,
  getCurrentDay,
  setCurrentDay,
} from "../data/dataAccess.js";

export const showSelectedWeather = () => {
  const isNewDay = (currentDay, oldDay) => {
    if (currentDay.getDay() !== oldDay) {
      setCurrentDay(currentDay.getDay());
      return `</div><h3>${currentDay.toDateString()}</h3><div id='weatherRow'>`;
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
  const currentDate = new Date(weather[0].dt * 1000);
  const currentDisplayHour = currentDate.getHours();
  const day = currentDate.getDay();
  setCurrentDay(day);
  let html = `<h3>${currentDate.toDateString()}</h3><div id='weatherRow'>`;

  if (currentDisplayHour !== 0) {
    for (let i = 0; i < currentDisplayHour / 3; i++) {
      html += `<ul class="dates"><li class="blank"></li></ul>`;
    }
  }

  html += `
    ${weather
      .map((w) => {
        const d = new Date(w.dt * 1000)
<<<<<<< HEAD
       
=======
>>>>>>> 9d7d63bd8971c8e0a838a69f76ccf28e9e241e4e
        const oldDay = getCurrentDay();
        const temp = Math.round(w.main.temp)
        let tempColor;
        if (temp < 35) {
          tempColor = `0, 20, 255`
        } else if (temp < 55) {
          tempColor = `0, 120, 255`
        } else if (temp < 75) {
          tempColor = `0, 180, 255`
        } else if (temp < 85) {
          tempColor = `0, 255, 255`
        } else {
          tempColor = `245, 17, 1`
        }
        
        return `
        ${isNewDay(d, oldDay)}
        <div class="var" style="--url: url(http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png); --color: ${tempColor};" >
          <ul class="dates">
            <li> ${d.getHours()}:00</li>
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
