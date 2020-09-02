import {getGroups} from "../../requests/request";
import {Select} from "../../utils/Select/select";

const getSelect = async () => {
  const allGroups = await getGroups()

  console.log('data: ', allGroups)
  //
  // const options = allGroups.data
  //   .map( group => {
  //     return `<option value="${group.name}">${group.name}</option>`
  //   })
  //   .join( ' ')
  //
  // document.querySelector(`.${selector}`)
  //   .insertAdjacentHTML('beforeend', options)

  const select = new Select('#select', {
    placeHolder: 'Select something',
    selectedId: 1,
    data: allGroups.data,
    fieldValue: 'name',
    onSelect(item) { // некий callback - который вызывается после того как элемент выбран
      console.log('Selected item: ', item)
    },
    multiple: true,
  })

}
export default getSelect