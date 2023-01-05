export const HolidayRoad = () => {
  return `
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
        <div id="selectedPark"></div>
        <div id="selectedBizzarary"></div>
        <div id="selectedEatery"></div>
      </div>
      <div id="moreDetailsContainer"></div>
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
  `
}