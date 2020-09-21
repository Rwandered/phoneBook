import {deleteCardById, getCardByGroup, getCards, getGroups, getGroupsValueById} from "../../requests/request";
import Card from "../../components/Card/Card";
import {notify} from "../Notify/notifyUtils";

export const renderCard = cardsArray => {
  const cardWrapper = document.querySelector('.cards')
  ;[...cardWrapper.children].forEach(e => e.remove())

  for (const card of cardsArray) {
    const newC = new Card(card)
    cardWrapper.insertAdjacentElement('beforeend', newC.newCard())
  }
}

const checkGroupsValue = (where, what) => {
  const res = where.find( elem => elem.name === what)
  return res ? {  id: res.id, isInclude: true } : {  id: '', isInclude: false  }
}

const getCurrentGroupId = async (groupName) => {

  const {data} = await getGroups()
  const currentGroup = data.find( group => group.name === groupName)
  return currentGroup
}

export const startRender = async (param) => {
  try {
    const activeGroup = document.querySelector('.active_list_el')
    if (activeGroup) {
      let cards
      const { groups } = await getGroupsValueById({ids: param.card.groups} )

      if (activeGroup.dataset.allContact) {
        cards = await getCards()
        return renderCard(cards.data)

      } else {
        const {id} = await getCurrentGroupId(activeGroup.textContent.trim())
        cards = await getCardByGroup(id)
        return renderCard(cards.data)
      }
    }
  } catch (error) {
    notify.show(error)
  }

}

export const deleteCard = (id) => {
  deleteCardById(id).then( (res) => {
    startRender(res)
  })
}