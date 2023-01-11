import { applicationState, getCurrentItinerary, getEvents, getItineraries, getParks, sendItinerary, setCurrentGPS } from "../data/dataAccess.js";


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
                setCurrentGPS(itin.selectedPark.latitude, itin.selectedPark.longitude)
            }
        }
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
})

//EL needs to match the itin's park.fullName with the event's park.fullName
//Then display the first two event's title, dateStart, timeStart, timeEnd, description and feel info in a dialogue box.

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

//function that takes an itinerary as an argument
//function will iterate through each event's index to find a fullname to itin's parkFullName
//after 2 matches are found window.alert "title, dateStart, timeStart, timeEnd, description" for both events
//if no matches are found use activities?

const parkEventMatcher = (itinerary) => {
    const events = getEvents()
    let eventMatch = []
    for (const event of events) {
            if (event.parkfullname === itinerary.selectedPark.fullName) {
                eventMatch.push(event)
            }
            else {const a=0}
    }
    if (eventMatch.length === 0) {
        window.alert("No events planned for this park")
    }
    else {
        window.alert(`${eventMatch[0].parkfullname}\n${eventMatch[0].date}\n${eventMatch[0].times[0].timestart}\n${eventMatch[0].times[0].timeend}\n${eventMatch[0].description}`)
    }
}

// window.alert(`${event.parkfullname}\n${event.date}\n${event.times[0].timestart}\n${event.times[0].timeend}\n${event.description}`)
// window.alert("No events planned for this park")