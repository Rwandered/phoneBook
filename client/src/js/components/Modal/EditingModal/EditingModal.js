import Modal from '../Modal'
import getSelect from "../../Select/Select";
import {formBody} from "../../../utils/Form/form";

const editingModal = options => {
  console.log('options: ', options)
  const editModal = new Modal( {
    title: 'Edit card',
    closable: true,
    buttons: [{
      text: 'Ok',
      type: 'ok',
      handler() {


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
    body: formBody()
  } )

  getSelect()
}

export default editingModal