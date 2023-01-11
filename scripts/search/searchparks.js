import { getParks } from "../data/dataAccess.js";




export const parkActivities = () => {
    const parks = getParks();
    
    const parkActivity = parks[0].activities.map((activity) => ({ ...activity }))
    let html = `

    <div id="searchFunction">
        <div class="search-wrapper">
        <label for="search">Search</label>
        </div>
        <input type="search" id="search" data-search>
    </div>
            
        ${parkActivity
          .map((activity) => {
            return `
            <div class="card">
              <div class="header" data-header id="${activity.id}">${activity.name}</div>
            </div>`
        }).join("")}
        </select>
        `;
    return html;
     };

     document.addEventListener("input", (e) => {
   
        if (e.target === ["data-search"]) {
            const searchTerm = e.target.elements["data-search"].values
            const parks = getParks()
            console.log(searchTerm)
        //     const parkActivity = parks[0].activities.map((activity) => ({ ...activity }))
        //     const value = e.target.value.toLowerCase()
        //  parkActivity.forEach(activity =>{
        //     const isVisible = 
        //     activity.name.toLowerCase().includes(value)
        //     document.getElementById([`${activity.id}`]).classList.toggle("hide",!isVisible)
        //  })
        }
    })