import { getWeather } from "../data/dataAccess.js";

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
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date(`${w.dt_txt}`)
        let name = month[d.getMonth()];
       
        return `
        
        <div class="date_container">
        <ul class="dates">
        <li>${name}, ${d.getDate()}</li>
        <li><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"/></li>
        <li>${w.weather[0].description}</li>
        
        <li>${d.getHours()}:00</li>
        <li>temp: ${Math.round(w.main.temp)}\u00B0F</li></ul></div>`;
      })
      .join("<br>")}
    `;
    
}
