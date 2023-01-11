import { getParks } from "../data/dataAccess.js";




export const parkActivities = () => {

    let html = `

    <div class="form-container">
              <div>
                  <input id="searchInput" type="text" class="input" placeholder="search..."/>
                  <button id="search">Search</button>
              </div>

    </div>
    <div class="results-container>
       <ul class="results-list" id="list">

       </ul>
    </div>
            
          `
          return html
    }

    document.addEventListener("click", (e) => {
        if (e.target.id === "search") {
          let value = document.getElementById("searchInput").value
           console.log(value)
        }
      });