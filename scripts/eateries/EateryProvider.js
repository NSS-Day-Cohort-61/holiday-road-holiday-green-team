import { getEateries } from "../data/dataAccess.js"



export const eateryDropdown = () => {
    const eateries = getEateries()
    let html = ``
    html += `<select id="eatery">`
    html += `<option value="0">Select Eatery</option>`
    
    for (const eatery of eateries) {
        html += `<option value="${eatery.id}">${eatery.businessName}</option>`
    }
    html += `</select>`
    return html
}
