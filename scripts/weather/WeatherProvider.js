import { fetchWeather, getWeather } from "../data/dataAccess.js";

export const selectWeather = (latitude, longitude) => {
  fetchWeather(latitude, longitude);
  let html = `
  ${getWeather().map((weather) => {
    return `
    ${weather.main.temp}
    `
  }).join(" ")}
  `;
  return html;
};
