import { fetchWeather, getParks } from "../data/dataAccess.js"

/*

Create drop down for park selection\
When park selction is made
Use park id to get latitude and longitude from park database


feed lat and longitude into a fetch call for the weather API
return fetch and save to database 
retieve from database and display in weather for that selected park

*/


const ParksList = (park) => {
    
    return ` 
  
         <option value="${park.id}">${park.fullName}
         </option>
     `
     }

export const ParkList = () => {
    const parks = getParks()
    let html = `
            <select id="parks" name="parks">
            <option value="null">Choose a State Park</option>
        ${
            parks.map(
                    (park) => {
                        return ParksList(park)
            }
        ).join("")
        }
        </select>
        `
        return html

    }
    const selectWeather = (latitude, longitude) => {
        fetchWeather(latitude, longitude)
        let html = `
            latitude: ${latitude}  longitude:${longitude}
        `
        return html
        

    }



    document.addEventListener("change", e => {
        if (e.target.id === "parks") {
            const parksList =getParks()

            const selectedPark = document.querySelector("#selectedPark");
            const selectedWeather = document.querySelector("#location")
            const chosenPark = parksList.find(
                (park) => 
                 park.id == (e.target.value)
            )
            selectedPark.innerHTML = chosenPark.fullName
            selectedWeather.innerHTML = selectWeather(chosenPark.latitude,chosenPark.longitude)
            
        }
    
    }
    )

