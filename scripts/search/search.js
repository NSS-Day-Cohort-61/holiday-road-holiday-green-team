

import { getData, setData, setSelected } from "../data/dataAccess.js";

/*
-userInput is the user input ie the data passed when the event listener is triggered
-objectData is the JSON database that we are recieving
-setReturnedData is the function that will do something with the result
-by setting the objectData and combination to default values of empty arrays it 
  will be okay if the user doesn't pass values to these
*/
const search = (userInput, objectData = [], setReturnedData) => {
    // const input = event.target.value.toLowerCase(); 

    // declares a variable for storing the passed userInput as lower-case
    const input = userInput.toLowerCase();

    //declare a variable to store the filtered Results

    const result = objectData.filter((data) => {

        /*loop over the object keys and return the 
        first succesful match (.some at work here)
        -.some will return that element as soon as it finds a truthy value
        --more than one value in the object we are testing might match but
        --once we have found one match we return that whole element as a 
        --match without checking other keys values 
        */
        return Object.keys(data).some((key) => {
            /*
            -the following gets the current value of the Object, and since
                we dont know the keys beforehand, we'll use data[key] which
                allows us to get the values of objects with dynamic keys.
            -convert the value to a string using JSON.stringify
            -convert the value to lower case to match the user input 
                already converted to lower-case
            -trim out any trailing white sapces at the start or end    
            -check if it includes the search input value
            */
            return (JSON.stringify(data[key]).toLowerCase().trim().includes(input));
        });
    });
    // function to recieve the result of the search query data
    setReturnedData(result, "searchResults")
};

export const searchFeature = () => {
    let html = `
        <input autocomplete="off" type="search" id="search" placeholder="Search">
            ${searchOptionList()}
        <button id="searchDatabase"type="search">Search</button>
        <button id="clearSearch"type="search">Clear</button>
        <ul id="result"></ul>`
    return html;
}

//Clear Search Area Event Listener
document.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === ("clearSearch")) {
        const searchResultElement = document.getElementById("result");
        const searchTextBoxElement = document.getElementById("search");
        searchTextBoxElement.value = "";
        searchResultElement.innerHTML = "Lets do another Search";
        //function that clears the checked checkbox in the search radio options
        const get = document.getElementsByName('dataList');
        for (let i = 0; i < get.length; i++) {
            get[i].checked = false;
        }
    }
})
//Database Search Event Listener
document.addEventListener("click", (clickEvent) => {

    if (clickEvent.target.id === ("searchDatabase")) {

        const selectedOption = document.querySelector('input[name="dataList"]:checked').value;

        //get databases
        const parks = getData("parks")
        const eateries = getData("eateries")
        const bizarreries = getData("bizarreries")


        //limit the values the user can search for
        const parkObjects = parks.map((park) => {
            const parkObject = {
                id: park.id,
                name: park.fullName
            }
            return parkObject
        })

        const bizarrerieObjects = bizarreries.map((bizarreries) => {
            const bizarrerieObject = {
                id: bizarreries.id,
                name: bizarreries.name,
                city: bizarreries.city,
            }
            return bizarrerieObject
        })

        const eateryObjects = eateries.map((eatery) => {
            const eateryObject = {
                id: eatery.id,
                name: eatery.businessName,
                city: eatery.city,
            }
            return eateryObject
        })

        //selected radio button picks which database to search
        let searchObject = {}
        if (selectedOption === "parks") {
            searchObject = parkObjects
        }
        if (selectedOption === "eateries") {
            searchObject = eateryObjects
        }
        if (selectedOption === "bizarreries") {
            searchObject = bizarrerieObjects
        }
        //retrieves the search parameter from the user
        const input = document.getElementById("search").value
        //invoke the search algorithm
        search(input, searchObject, setData)
        //gets the element with an ID of result
        const resultsElement = document.getElementById("result")
        //invokes the displayResults function and passes the selected Radio Option 
        resultsElement.innerHTML = displayResults(selectedOption);
    }


})

const displayResults = (selectedOption) => {
    const searchResultsForDisplay = getData("searchResults")
    let searchResultsHTML = " "
    for (const result of searchResultsForDisplay) {
        searchResultsHTML += `
        <li>${result.name}
            <button type="search" id="addToDisplay--${selectedOption}--${result.id}">Add</button>
        </li>`
    }
    return searchResultsHTML;
}

export const searchOptionList = () => {
    const datalist = getData("searchOptions")

    let html = "<ul>"
        for (const dataOption of datalist) {
        html += `
            <li id="noclick">
                <input type="radio" name="dataList" value="${dataOption.dataName}" 
                id="${dataOption.id}"/> ${dataOption.dataName}
            </li>`
    }   
    html += "</ul>"
    return html
}
//add search result to the Itinerary Preview Section by setting selectedState in applcation state
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("addToDisplay--")) {
            const [, option, selectionId] = itemClicked.id.split("--")

            if (option === "parks") {
                const parksList = getData("parks");
                const chosenPark = parksList.find((park) => park.id == selectionId);
                setSelected(chosenPark, "selectedPark");
                //setCurrentGPS(chosenPark.latitude, chosenPark.longitude)

            } else if (option === "eateries") {
                const parksList = getData("eateries");
                const chosenEatery = parksList.find((eatery) => eatery.id === parseInt(selectionId));
                setSelected(chosenEatery, "selectedEatery");

            } else if (option === "bizarreries") {
                const bizarreriesList = getData("bizarreries")
                const chosenBizerrerie = bizarreriesList.find((bizarrerie) => bizarrerie.id == parseInt(selectionId));
                setSelected(chosenBizerrerie, "selectedBizarrerie");

            }

        }
    }
)

