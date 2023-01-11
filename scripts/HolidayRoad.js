import { parkDropdown, showSelectedPark } from "./parks/ParkProvider.js"
import { showSelectedWeather } from "./weather/WeatherProvider.js"
import { eateryDropdown, showSelectedEatery } from "./eateries/EateryProvider.js"
import { bizarrerieDropdown, showSelectedBizarrerie } from "./bizarreries/bizarrerieProvider.js"
import { showMoreDetails } from "./attractions/AttractionProvider.js"
import { savedItineraryHTML } from "./itineraries/savedItineraries.js"
import { getCurrentItinerary } from "./data/dataAccess.js"
import { showDirections } from "./directions/DirectionProvider.js"

import { parkActivities } from "./search/searchparks.js"

export const HolidayRoad = () => {
  return `
  <div id="body">
    <h1> Holiday Road </h1>
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
        <h3>Directions</h3>
        ${showDirections()}
      </div>
      <div id="savedItineraryListContainer">
        <h3>Saved Itineraries</h3>
        ${savedItineraryHTML()}
 
        
  ${parkActivities()}
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
