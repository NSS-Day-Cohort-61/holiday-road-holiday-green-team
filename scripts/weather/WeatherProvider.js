import { fetchWeather, getWeather } from "../data/dataAccess.js";

export const showChrisWeather = () => {
  const weather = getWeather();
  return `
  ${weather
    .map((w) => {
      
      return `
        The temperature on ${w.dt_txt} is: ${Math.round(w.main.temp)}\u00B0F`;
    })
    .join("<br>")}
  `;
};

export const showSelectedWeather = () => {

    const weather = getWeather()

    return `
    ${weather
      .map((w) => {
        
        return `
        <ul>
        <li><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"></li>
        <li>${w.dt_txt}</li>
        <li>${w.weather[0].description}</li>
        <li>temp: ${Math.round(w.main.temp)}\u00B0F</li></ul>`;
      })
      .join("<br>")}
    `;
    list[0].weather[0]
}
