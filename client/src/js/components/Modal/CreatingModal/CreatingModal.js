import Modal from "../Modal"
import {setCard, getCards, getCardByGroup } from "../../../requests/request"
import { renderCard } from "../../ListGroups/ListGroups"
import getSelect from "../../Select/Select";
import {_getFormData, formBody} from "../../../utils/Form/form";

export default function CreatingModal() {

  const modalWindow = new Modal({
    title: 'Create card',
    closable: true,
    buttons: [{
      text: 'Ok',
      type: 'ok',
      handler() {
        setCard(_getFormData())
          .then(async res => {
            const activeGroup = document.querySelector('.active_list_el')
            if (activeGroup) {
              let cards
              if (activeGroup.dataset.allContact) {
                cards = await getCards()
                renderCard(cards.data)
              } else if (activeGroup.textContent === res.card.group) {
                cards = await getCardByGroup(activeGroup.textContent)
                renderCard(cards.data)
              }
            }
          })
      }
    },
      {
        text: 'Cancel',
        type: 'cancel',
        handler() {
          modalWindow.close()
        }
      }
    ],
    entry: 'phoneBook',
    body: formBody()
  })

  getSelect()
}