import { applicationState, getCurrentItinerary, getItineraries, sendItinerary } from "../data/dataAccess.js";


//Do I need to save & match IDs?
//Does does event listener need anything other than to run the function to display?
export const savedItineraryHTML = () => {
    const itineraries = getItineraries()
    let html = `<article class="savedItins">
        <ol>`
    html += `
    ${
      itineraries.map(
        itinerary => {
            return `<li class="savedSingles"><ul>
                <li><strong>Park:</strong> ${itinerary.selectedPark.fullName}</li>
                <li><strong>Bizarrerie:</strong> ${itinerary.selectedBizarrerie.name}</li>
                <li><strong>Eatery:</strong> ${itinerary.selectedEatery.businessName}</li>
                </ul></li><br>
            `
        }
      ).join("")  
    }`
    html += `</ol> `
    return html
}

const applicationElement = document.querySelector("#container")

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save") {
        const selectedItinerary = getCurrentItinerary()
        sendItinerary(selectedItinerary)
    }
})

export const enableSaveButton = () => {
    let inputs = document.getElementsByClassName('reqInputs');
    let btn = document.querySelector('input[type="submit"]');
    console.log(btn)
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        let changedInput = inputs[i];
        if (changedInput.value == 0 || changedInput.value === null){
            document.querySelector('input[type="submit"]').disabled = true
            break; 
        }
        else {document.querySelector('input[type="submit"]') = false }
    }
}

