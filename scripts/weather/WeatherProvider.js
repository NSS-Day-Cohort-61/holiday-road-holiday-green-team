import { fetchWeather, getWeather } from "../data/dataAccess.js";

// export const selectWeather = (latitude, longitude) => {
//   fetchWeather(latitude, longitude);
//   let html = `
//   ${getWeather()
//     .map((weather) => {
//       return `
//     ${weather.main.temp}
//     `;
//     })
//     .join(" ")}
//   `;
//   return html;
// };

export const showSelectedWeather = () => {
  const weather = getWeather();
  return `
  ${weather
    .map((w) => {
      const date = Date(w.dt_txt)
      return `
        The temperature on ${date} is: ${Math.round(w.main.temp)}\u00B0F`;
    })
    .join("<br>")}
  `;
};
