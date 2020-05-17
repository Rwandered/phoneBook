import {getGroups} from "../../requests/request";

const getSelect = async selector => {
  const allGroups = await getGroups()

  const options = allGroups.data
    .map( group => {
      return `<option value="${group.name}">${group.name}</option>`
    })
    .join( ' ')

  document.querySelector(`.${selector}`)
    .insertAdjacentHTML('beforeend', options)

}
export default getSelect