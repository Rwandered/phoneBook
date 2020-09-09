import {getCardByGroup, getCards, getGroupsValueById} from "../../requests/request";
import {renderCard} from "../../components/ListGroups/ListGroups";

const checkGroupsValue = (where, what) => {
  debugger
  const res = where.find( elem => elem.name === what)
  return res ? {  id: res.id, isInclude: true } : {  id: '', isInclude: false  }
}

export const startRender = async (param) => {
  const activeGroup = document.querySelector('.active_list_el')
  if (activeGroup) {
    let cards
    const { groups } = await getGroupsValueById({ids: param.card.groups} )

    if (activeGroup.dataset.allContact) {
      cards = await getCards()
      return renderCard(cards.data)

    } else {
      const {isInclude, id} = checkGroupsValue(groups, activeGroup.textContent.trim())

      if(isInclude) {
        cards = await getCardByGroup(id)
        return renderCard(cards.data)
      }
      return null
    }
  }
  //   тут уведомление, что все ок
}