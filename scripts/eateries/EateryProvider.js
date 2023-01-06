import { getEateries, getSelectedEatery, setSelectedEatery } from "../data/dataAccess.js"



export const eateryDropdown = () => {
    const eateries = getEateries()
    const selectedEatery = getSelectedEatery()

    let html = `
            <select id="eatery" name="eateries">
            <option value=null>Select Eatery</option>
            ${eateries
                .map((eatery) => {
                if (eatery.id === selectedEatery.id){
                    return `<option selected value="${eatery.id}">${eatery.businessName}</option>`
                } else {
                    return `<option value="${eatery.id}">${eatery.businessName}</option>`
                }
            })
            .join("")}
            </select>
            `;
    return html
};


export const showSelectedEatery = () => {
    const selectedEatery = getSelectedEatery();
    if (selectedEatery.businessName) {
        return `
        <div id="selectedEatery">${selectedEatery.businessName}</div>
        `;
    } else {
        return `
        <div id="selectedEatery"></div>
        `;
    }
};

document.addEventListener("change", (e) => {
    if (e.target.id === "eatery") {
      const eateryList = getEateries();
      const chosenEatery = eateryList.find((eatery) => eatery.id === parseInt(e.target.value));
      setSelectedEatery(chosenEatery);
    }
  });