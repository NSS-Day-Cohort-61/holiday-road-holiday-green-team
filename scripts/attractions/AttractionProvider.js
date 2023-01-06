import { getSelectedBizarrerie } from "../data/dataAccess.js"

export const showMoreDetails = () => {
  return `
  ${bizarrerieDetails()}
  `
}

const bizarrerieDetails = () => {
  const selectedBizarrerie = getSelectedBizarrerie()
  console.log(selectedBizarrerie)
  return `
  ${selectedBizarrerie.name}
  `
}