import {
  getBizarreries,
  setSelectedBizarrerie,
  getSelectedBizarrerie,
} from "../data/dataAccess.js";
// import { enableSaveButton } from "../itineraries/savedItineraries.js";

export const bizarrerieDropdown = () => {
  const bizarreries = getBizarreries();
  const selectedBizarrerie = getSelectedBizarrerie();
  let html = ``;
  html += `<select id="bizarrerie" class="reqInputs" name="bizarreries" onkeyup="${enableSaveButton()}">`;
  html += `<option value=0>Select Bizarrerie</option>`;

  for (const bizarrerie of bizarreries) {
    if (bizarrerie.id === selectedBizarrerie.id) {
      html += `<option selected value="${bizarrerie.id}">${bizarrerie.name}</option>`;
    } else {
      html += `<option value="${bizarrerie.id}">${bizarrerie.name}</option>`;
    }
  }
  html += `</select>`;
  return html;
};

// <div id="selectedBizarrerie"></div>
export const showSelectedBizarrerie = () => {
  const selectedBizarrerie = getSelectedBizarrerie();
  if (selectedBizarrerie.name) {
    return `<div id="selectedBizarrerie">${selectedBizarrerie.name}</div>`;
  } else {
    return '<div id="selectedBizarrerie"></div>';
  }
};

document.addEventListener("change", (e) => {
  if (e.target.id === "bizarrerie") {
    const bizarreries = getBizarreries();
    const chosenBizarrerie = bizarreries.find(
      (biz) => biz.id === parseInt(e.target.value)
    );
    setSelectedBizarrerie(chosenBizarrerie);
  }
});
