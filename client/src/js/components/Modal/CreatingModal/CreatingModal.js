import Modal from "../Modal"
import {setCard} from "../../../requests/request"
import getSelect from "../../Select/Select";
import {_getFormData, formBody} from "../../../utils/Form/form";
import {startRender} from "../../../utils/Cards/cardsUtil";
import {notify} from "../../../utils/Notify/notifyUtils";


export default function CreatingModal() {

  const modalWindow = new Modal({
    title: 'Create card',
    closable: true,
    buttons: [{
      text: 'Ok',
      type: 'submit',
      handler() {
        setCard(_getFormData())
          .then(async res => {
            await startRender(res)
            notify.show('Phone number has been created...')
          }).catch( error => {
            notify.show(error)
        })
        modalWindow.close()
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