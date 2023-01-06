import { parkDropdown, showSelectedPark } from "./parks/ParkProvider.js"
import { showSelectedWeather } from "./weather/WeatherProvider.js"
import { eateryDropdown } from "./eateries/EateryProvider.js"
import { bizarrerieDropdown } from "./bizarreries/bizarrerieProvider.js"

export const HolidayRoad = () => {
  return `
  <div id="body">
    <h2> Holiday Road </h2>
    <div id="selectDropdowns">
      ${parkDropdown()}
      ${bizarrerieDropdown()}
      ${eateryDropdown()}
    </div>
    <div id="mainContent">
      <div id="itineraryPreviewContainer">
        <h3>Itinerary Preview</h3>
        <div id="selectedChoicesContainer">
            <div class="selectedLabel">Park Name</div>
            ${showSelectedPark()}
            <div class="selectedLabel">Bizarrerie</div>
            <div id="selectedBizarrerie"></div>
            <div class="selectedLabel">Eatery</div>
            <div id="selectedEatery"></div>
        </div>
        <div id="moreDetailsContainer">
          <h3>More Details</h3>
        </div>
        <button id="save">Save</button>
      </div>
      <div id="weatherContainer">
      <h3>Weather</h3>
      ${showSelectedWeather()}
      </div>
      <div id="savedItineraryListContainer">
      <h3>Saved Itineraries</h3>
      <ul>
        <li>First Itinerary</li>
      </ul>
      </div>
    </div>
  </div>
  `
}