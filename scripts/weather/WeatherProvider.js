import { getWeather } from "../data/dataAccess.js";

export const showSelectedWeather = () => {
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
