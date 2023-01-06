import { getBizarreries } from "../data/dataAccess.js"



export const bizarrerieDropdown = () => {
    const bizarreries = getBizarreries()
    let html = ``
    html += `<select id="bizarrerie">`
    html += `<option value="0">Select Bizarrerie</option>`

    for (const bizarrerie of bizarreries) {
        html += `<option value="${bizarrerie.id}">${bizarrerie.name}</option>`
    }
    html += `</select>`
    return html
}
