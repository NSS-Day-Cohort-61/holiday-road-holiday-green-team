import { applicationState, getCurrentItinerary, getEvents, getItineraries, getParks, sendItinerary, setCurrentGPS } from "../data/dataAccess.js";


export const savedItineraryHTML = () => {
    const itineraries = getItineraries()
    let html = `<article class="savedItins">
        <ol>`
    html += `
    ${itineraries.map(
        itinerary => {
            return `<li id="itinId--${itinerary.id}" class="savedSingles itinId--${itinerary.id}"><ul class="itinId--${itinerary.id}">
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Park:</strong><div class="selectedNames"> ${itinerary.selectedPark.fullName}</div></li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Bizarrerie:</strong><div class="selectedNames"> ${itinerary.selectedBizarrerie.name}</div></li>
                <li class="itinId--${itinerary.id}"><strong class="itinId--${itinerary.id}">Eatery:</strong><div class="selectedNames"> ${itinerary.selectedEatery.businessName}</div></li>
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
                setCurrentGPS(itin.selectedPark.latitude, itin.selectedPark.longitude)
            }
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
})

document.addEventListener("click", (clickEvent) => {
    const itineraries = getItineraries()
    if (clickEvent.target.id.startsWith("eventBtn--")) {
        const [, savedItinId] = clickEvent.target.id.split("--")
        for (const itin of itineraries) {
            if (itin.id === parseInt(savedItinId)) {
                parkEventMatcher(itin)
            }
        }
    }
})

const parkEventMatcher = (itinerary) => {
    const events = getEvents()
    let eventMatch = []
    let alertString = ""
    for (const event of events) {
        if (event.parkfullname == itinerary.selectedPark.fullName) {
            eventMatch.push(event)
        }
        else { const a = 0 } // means absolutely nothing. 
    }
    if (eventMatch.length === 0) {
        window.alert("No events planned for this park")
    }
    else {
        for (let i = 0; i < 2; i++) {
            alertString += eventMatch[i]
            window.alert(`${eventMatch[i].parkfullname}\n${eventMatch[i].date}\n${eventMatch[i].times[0].timestart}\n${eventMatch[i].times[0].timeend}\n${eventMatch[i].description.replaceAll(/<p>/g, '').replace(/<\/p>/g, '').replace(/<ul>/g,'').replace(/<\/ul>/g, '').replace(/<li>/g, "").replace(/<\/li>/g,'').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/<br \/>/g,'').replace(/<a href=/g, '').replace(/<\/a>/g, '').replace(/target="_blank"/g, '').replace(/rel="noopener noreferrer">/g)}`)
        }
    }
}
//