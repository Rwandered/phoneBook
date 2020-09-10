import {deleteCardById, getCardByGroup, getCards, getGroupsValueById} from "../../requests/request";
import Card from "../../components/Card/Card";

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

export const deleteCard = (id) => {
  deleteCardById(id).then( (res) => {
    startRender(res)
  })
}