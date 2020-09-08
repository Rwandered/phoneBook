import {getGroups} from "../../requests/request";
import {Select} from "../../utils/Select/select";

const getSelect = async (selectValues) => {
  const allGroups =  await getGroups()
  const defaultValue = selectValues && allGroups.data
    .filter( group => selectValues.includes(group.id))
    .map( group => group.name )
    .join(', ')

  return new Select('#select', {
    placeHolder: 'Select something',
    selectedId: 1,
    data: allGroups.data,
    fieldValue: 'name',
    onSelect(item) { // некий callback - который вызывается после того как элемент выбран
    },
    multiple: true,
    defaultValue: selectValues && defaultValue
  })

}
export default getSelect