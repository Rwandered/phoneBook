import Modal from "../Modal"
import {setCard} from "../../../requests/request"
import getSelect from "../../Select/Select";
import {_getFormData, formBody} from "../../../utils/Form/form";
import {startRender} from "../../../utils/Cards/cardsUtil";




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
            startRender(res)
          // //   тут уведомление, что все ок
          }).catch( error => {//    тут ошибка, что что-то не так
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