import { parkDropdown, showSelectedPark } from "./parks/ParkProvider.js"
import { showSelectedWeather } from "./weather/WeatherProvider.js"
import { eateryDropdown, showSelectedEatery } from "./eateries/EateryProvider.js"
import { bizarrerieDropdown, showSelectedBizarrerie } from "./bizarreries/bizarrerieProvider.js"
import { showMoreDetails } from "./attractions/AttractionProvider.js"

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
      <div id="leftSideContainer">
        <div id="itineraryPreviewContainer">
          <div id="selectedChoicesContainer">
            <h3>Itinerary Preview</h3>
            <div class="selectedLabel">Park Name</div>
            <div class="flexRow">
              ${showSelectedPark()}
              <button class="deets-btn" id="parks-btn">Details</button>
            </div>
            <div class="selectedLabel">Bizarrerie</div>
            <div class="flexRow">
              ${showSelectedBizarrerie()}
              <button class="deets-btn" id="biz-btn">Details</button>
            </div>
            <div class="selectedLabel">Eatery</div>
            <div class="flexRow">
              ${showSelectedEatery()}
              <button class="deets-btn" id="eat-btn">Details</button>
            </div>
            <button id="save" class="btn">Save</button>
            
          </div>
          <div id="moreDetailsContainer">
            <h3>More Details</h3>
            <div id="moreDetailsInfo">
            ${showMoreDetails()}
            </div>
          </div>
        </div>
        <div id="weatherContainer">
          <h3>Weather</h3>
          ${showSelectedWeather()}
        </div>
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