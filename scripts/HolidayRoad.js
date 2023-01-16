import { parkDropdown, showSelectedPark } from "./parks/ParkProvider.js"
import { selectWeatherLocation, setWeatherGPS, showSelectedWeather } from "./weather/WeatherProvider.js"
import { eateryDropdown, showSelectedEatery } from "./eateries/EateryProvider.js"
import { bizarrerieDropdown, showSelectedBizarrerie } from "./bizarreries/bizarrerieProvider.js"
import { showMoreDetails } from "./attractions/AttractionProvider.js"
import { savedItineraryHTML } from "./itineraries/savedItineraries.js"
import { getCurrentItinerary } from "./data/dataAccess.js"
import { showDirections, directionsDropdown } from "./directions/DirectionProvider.js"

import { searchFeature,searchOptionList } from "./search/search.js"

export const HolidayRoad = () => {
  // setWeatherGPS()
  return `
  <div id="body">
    <div class="backdrop">
    <h1 id="hRoad"><u> . . . : : : Holiday Road : : : . . . </u></h1>
    </div>
    <div id="header">
      <div id="leftHeader">
        <div id="selectDropdowns">
          ${parkDropdown()}
          ${bizarrerieDropdown()}
          ${eateryDropdown()}
        </div>
        <div id="directionsDropdowns">
          ${directionsDropdown()}
        </div>
        <div id="weatherSelectRadios">
          ${selectWeatherLocation()}
        </div>
      </div>
      <div id="rightHeader">
          ${searchFeature()}
      </div>
    </div>
    <div id="mainContent">
      <div id="leftSideContainer">
        <div id="itineraryPreviewContainer">
          <div id="selectedChoicesContainer">
            <h2>Itinerary Preview</h2>
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
            ${enableSaveButton()}   
          </div>
          <div id="moreDetailsContainer">
            <div id="moreDetailsInfo">
            ${showMoreDetails()}
            </div>
          </div>
        </div>
        <div id="weatherContainer">
          <div id="weather">
          ${showSelectedWeather()}
          </div>
        </div>
      </div>
      <div id="directionsContainer">
        <h2>Directions</h2>
        ${showDirections()}
      </div>
      <div id="savedItineraryListContainer">
        <h2>Saved Itineraries</h2>
        ${savedItineraryHTML()}
        <div id="hidden-Results" class="hidden"><h3>Click Add to Add Selection to Your Itinerary Preview</h3>
          <button id="clearSearch"type="search" class="deets-btn">Cancel</button>
        <ul id="result"></ul>
        <div>
 
  `
}

const enableSaveButton = () => {
  const currentItins = getCurrentItinerary();
  if (Object.keys(currentItins.selectedBizarrerie).length == 0 || Object.keys(currentItins.selectedPark).length == 0 || Object.keys(currentItins.selectedEatery).length == 0) {
    return `<button disabled="disabled" id="save" class="btn">Save</button>`
  }
  else {
    return `<button id="save" class="btn">Save</button>`
  }
}
