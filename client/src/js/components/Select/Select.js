import {getGroups} from "../../requests/request";
import {Select} from "../../utils/Select/select";

const getSelect = async selector => {
  const allGroups = await getGroups()

  console.log('data: ', allGroups)

  const options = allGroups.data
    .map( group => {
      return `<option value="${group.name}">${group.name}</option>`
    })
    .join( ' ')

  document.querySelector(`.${selector}`)
    .insertAdjacentHTML('beforeend', options)

  // const select = new Select('#select', {
  //   placeHolder: 'Select something',
  //   selectedId: 4,
  //   data: [
  //     {id: 1, value: 'React'},
  //     {id: 2, value: 'Angular'},
  //     {id: 3, value: 'Vue'},
  //     {id: 4, value: 'Js'},
  //     {id: 5, value: 'Node'},
  //     {id: 6, value: 'Nest'},
  //     {id: 7, value: 'RxJs'},
  //   ],
  //   onSelect(item) { // некий callback - который вызывается после того как элемент выбран
  //     console.log('Selected item: ', item)
  //   },
  //   multiple: true,
  // })


}
export default getSelect