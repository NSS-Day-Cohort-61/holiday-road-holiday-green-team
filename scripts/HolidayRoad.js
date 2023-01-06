import { getParks } from "./data/dataAccess.js"
import { ParkList } from "./weather/WeatherProvider.js"
import { eateryDropdown } from "./eateries/EateryProvider.js"
import { bizarrerieDropdown } from "./bizarreries/bizarrerieProvider.js"

export const HolidayRoad = () => {
  return `
  <div id="body">
    <h2> Holiday Road </h2>
    <div id="selectDropdowns">
      ${ParkList()}
      ${bizarrerieDropdown()}
      ${eateryDropdown()}
    </div>
    <div id="mainContent">
      <div id="itineraryPreviewContainer">
        <h3>Itinerary Preview</h3>
        <div id="selectedChoicesContainer">
          <div>
            <div class="selectedLabel">Park Name</div>
            <div id="selectedPark"></div>
            <div class="selectedLabel">Bizzarary</div>
            <div id="selectedBizarrerie"></div>
            <div class="selectedLabel">Eatery</div>
            <div id="selectedEatery"></div>
          </div>
        </div>
        <div id="moreDetailsContainer">
          <h3>More Details</h3>
        </div>
        <button id="save">Save</button>
      </div>
      <div id="weatherContainer">
      <h3>Weather</h3>
      <h2>Latitude and Longitude</h2>
      <div id="location">Location</div>
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