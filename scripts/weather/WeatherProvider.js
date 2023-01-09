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
        const smonth = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date(`${w.dt_txt}`)
        
        const sname = smonth[d.getMonth()];
        const name = month[d.getMonth()];
        if (d.getHours() === 3) {
          return `
        
          <div class="date_container">
              <ul class="dates">
                <li>${name}, ${d.getDate()}</li>
                <li>${d.getHours()}:00</li>
                <li><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"/></li>
                <li>${Math.round(w.main.temp)}\u00B0F</li>
              </ul>
          </div>`;
        
        } else if (d.getHours() === 6) {
          return `
        
          <div class="date_container">
              <ul class="dates">
                <li>${sname}, ${d.getDate()}</li>
                <li><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"/></li>
                <li>${d.getHours()}:00</li>
                <li>${Math.round(w.main.temp)}\u00B0F</li>
              </ul>
          </div>`;
        
        } else if (d.getHours() === 12) {
          return `
        
          <div class="date_container">
              <ul class="dates">
                <li>${sname}, ${d.getDate()}</li>
                <li class="big_temp">${Math.round(w.main.temp)}\u00B0F</li>
                <li>${d.getHours()}:00</li>
                <li>${w.weather[0].description}</li>
              </ul>
          </div>`;
        
        } else if (d.getHours() === 15) {
          return `
        
          <div class="date_container">
              <ul class="dates">
                <li>${sname}, ${d.getDate()}</li>
                <li class="big_temp">${Math.round(w.main.temp)}\u00B0F</li>
                <li>${d.getHours()}:00</li>
                <li>${w.weather[0].description}</li>
              </ul>
          </div>`;
        
        } else if (d.getHours() === 18) {
          return `
         
          <div class="date_container" id="bck_image">
              <ul class="dates">
                <li>${sname}, ${d.getDate()} ${d.getHours()}:00</li>
                <li class="a">____</li>
                <li class="a">____</li>
                <li class="big_temp">${Math.round(w.main.temp)}\u00B0F</li>
                <li>${w.weather[0].description}</li>
                
              </ul>
          </div>`;
        
        }
        
          else  {
            return `
          <div class="date_container">
            <ul class="dates">
              <li>${name}, ${d.getDate()}</li>
              <li>${d.getHours()}:00</li>
              <li><img src="http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png"/></li>
              <li>${w.weather[0].description}</li>
              <li>${Math.round(w.main.temp)}\u00B0F</li>
            </ul>
          </div>`;
        }

        

        
  })
      .join("<br>")}
    `;
    
}
