import {getGroups} from "../../requests/request";
import {Select} from "../../utils/Select/select";
import {notify} from "../../utils/Notify/notifyUtils";

const getSelect = async (selectValues) => {
  try {
    const allGroups =  await getGroups()
    const defaultValue = selectValues && allGroups.data
      .filter( group => selectValues.includes(group.id))
      .map( group => group.name )
      .join(', ')

    return new Select('#select', {
      placeHolder: 'Select something',
      selectedId: selectValues || [1],
      data: allGroups.data,
      fieldValue: 'name',
      onSelect(item) { // некий callback - который вызывается после того как элемент выбран
      },
      multiple: true,
      defaultValue: selectValues && defaultValue
    })
  } catch (error) {
    notify.show(error)
  }
}
export default getSelect