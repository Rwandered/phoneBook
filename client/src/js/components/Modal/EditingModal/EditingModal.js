import Modal from '../Modal'
import getSelect from "../../Select/Select";
import {_getFormData, formBody} from "../../../utils/Form/form";
import {updateCard} from "../../../requests/request";
import {startRender} from "../../../utils/Cards/cardsUtil";


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
          .then( res => {
            console.log('res :', res)
            startRender(res)
          })
          .catch(error => {})
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

  getSelect(options.groups)
}

export default editingModal