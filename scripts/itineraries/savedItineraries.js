import { applicationState, getCurrentItinerary, getItineraries, getParks, sendItinerary } from "../data/dataAccess.js";


//Do I need to save & match IDs?
//Does does event listener need anything other than to run the function to display?
export const savedItineraryHTML = () => {
    const itineraries = getItineraries()
    let html = `<article class="savedItins">
        <ol>`
    html += `
    ${itineraries.map(
        itinerary => {
            return `<li id="itinId--${itinerary.id}" class="savedSingles itinId--${itinerary.id}"><ul class="itinId--${itinerary.id}">
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Park:</strong> ${itinerary.selectedPark.fullName}</li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Bizarrerie:</strong> ${itinerary.selectedBizarrerie.name}</li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Eatery:</strong> ${itinerary.selectedEatery.businessName}</li>
                </ul><br><button class="eventBtn" id="eventBtn--${itinerary.id}">Events</button></li><br>
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



document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.className.startsWith("itinId--")) {
        const [, savedItinId] = clickEvent.target.className.split("--")
        const itineraries = getItineraries();
        for (const itin of itineraries) {
            if (itin.id === parseInt(savedItinId)) {
                applicationState.currentItinerary = itin
            }
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
})


document.addEventListener("click", (clickEvent) => {
    const parks = getParks()
    const itineraries = getItineraries()
    if (clickEvent.target.id.startsWith("eventBtn--")) {
        const [, savedItinId] = clickEvent.target.id.split("--")
        for (const itin of itineraries){
            if (itin.id === parseInt(savedItinId)) {
                window.alert(`${itin.selectedPark.fullName}\n `)
            }
                
            }
        }

    }
)