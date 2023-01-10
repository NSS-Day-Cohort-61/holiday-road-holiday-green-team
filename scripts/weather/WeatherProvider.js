import { getWeather, fetchWeather } from "../data/dataAccess.js";




export const showSelectedWeather = () => {
  const weather = getWeather()

  const currentTime = new Date((weather[0].dt * 1000))
  const currentdisplayHour = currentTime.getHours()
  let html = ""

  if (currentdisplayHour !== 0) {
    for (let i = 0; i <= (currentdisplayHour / 3); i++) {
      html += `<ul class="dates"><li class="blank"><div "> </div></li></ul>`;

    }
  }
   html += `
    ${weather
      .map((w) => {
        
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(`${w.dt_txt}`)
        const name = month[d.getMonth()];
        return `
        
        <div class="var" style="--url: url(http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png")">
            <ul class="dates">
              <li>${name} ${d.getDate()}</li>
            <li> ${d.getHours()}:00</li>
              <li class="a"></li>
              <li class="big_temp">${Math.round(w.main.temp)}\u00B0F</li>
              <li>${w.weather[0].description}</li>
            </ul>
        </div>`

      })
      .join("<br>")}
    `;
  return html
}


// geo location position
const successCallback = (position) => {
  console.log(position);
  const currentTime = new Date((position.timestamp))
  const currentdisplayHour = currentTime.getHours()
  const cnt = Math.floor(39 - currentdisplayHour / 3)
  console.log(cnt)
  fetchWeather(position.coords.latitude, position.coords.longitude, cnt)
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);