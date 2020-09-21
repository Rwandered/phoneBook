import Modal from '../Modal'
import getSelect from "../../Select/Select";
import {_getFormData, formBody} from "../../../utils/Form/form";
import {updateCard} from "../../../requests/request";
import {startRender} from "../../../utils/Cards/cardsUtil";
import Info from "../../Info/Info";
import {removeDescription} from "../../../utils/DOM/domUtil";
import {notify} from "../../../utils/Notify/notifyUtils";


const editingModal = options => {

  const editModal = new Modal( {
    title: 'Edit card',
    closable: true,
    buttons: [{
      text: 'Ok',
      type: 'ok',
      handler() {
        console.log('Save editing')
        updateCard( _getFormData(options.id) )
          .then( async res => {
            await startRender(res)
            removeDescription()
            new Info(res.card)
            notify.show('Phone number has been updated...')
          })
          .catch(error => {
            notify.show(`Doesn't update this phone. Error: ${error}`)
          })
      }
    },
      {
        text: 'Cancel',
        type: 'cancel',
        handler() {
          editModal.close()
        }
      }
    ],
    entry: 'phoneBook',
    body: formBody(options)
  } )
  console.log('options: ', options)
  getSelect(options.groups)
}

export default editingModal