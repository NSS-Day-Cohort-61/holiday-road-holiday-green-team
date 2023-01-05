import { getParks } from "./data/dataAccess.js"

export const HolidayRoad = () => {
  return `
  <div id="body">
    <h2> Holiday Road </h2>
    <div id="selectDropdowns">
      <select>
        <option>Choose your park...</option>
      </select>
      <select>
        <option>Choose your bizzarary...</option>
      </select>
      <select>
        <option>Choose your eatery...</option>
      </select>
    </div>
    <div id="mainContent">
      <div id="itineraryPreviewContainer">
        <h3>Itinerary Preview</h3>
        <div id="selectedChoicesContainer">
          <div>
            <div class="selectedLabel">Park Name</div>
            <div id="selectedPark"></div>
            <div class="selectedLabel">Bizzarary</div>
            <div id="selectedBizzarary"></div>
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