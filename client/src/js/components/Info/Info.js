import FalseFieldInfo from "../FalseFieldInfo/FalseFieldInfo"
import toUpperFistLetter from "../../utils/Text/text"
import editingModal from "../Modal/EditingModal/EditingModal"
import {getCardById} from "../../requests/request";
import {deleteCard} from "../../utils/Cards/cardsUtil";
import {removeDescription} from "../../utils/DOM/domUtil";
import Loader from "../Loader/Loader";
import {notify} from "../../utils/Notify/notifyUtils";

const handler = async (event, options) => {
  if (event.target.dataset.newPhoneField) {
    if (document.querySelector('.false__field__wrapper').dataset.active) {
      new FalseFieldInfo()
    }
  } else if (event.target.dataset.editCard) {
    try {
      const { data } = await getCardById(options.id)
      editingModal(data)
    } catch (error) { notify.show(error) }
  } else if (event.target.dataset.delCard) {
    const loader = new Loader('.cards')
    deleteCard(options.id)
    loader.hide()
    removeDescription()
    notify.show('Phone number has been deleted...')
  }
}


export default class Info {
  constructor(options) {
    this.id = options.id
    this.options = options
    this.create()
  }


  create() {
    this.infoWrapper = document.createElement('div')
    this.infoWrapper.classList.add('description__row')
    this.infoWrapper.dataset.id = this.id
    this.infoWrapper.insertAdjacentHTML('beforeend', this.toHtml())

    this.infoWrapper.addEventListener('click', (event) => handler(event, this.options) )
    document.querySelector('.phoneBook__description').insertAdjacentElement('beforeend', this.infoWrapper)
  }

  destroy() {
    this.infoWrapper.removeEventListener('click', handler)
  }

  toHtml() {

    const numberInfoWrap = document.createElement('div')
    numberInfoWrap.classList.add('number__info')
    const numberInfoContent = this.options.numbers.reduce((ac, elem) => {
      return ac + `<p>${toUpperFistLetter(elem.type)} phone:</p>
         <p>${elem.number}</p>`
    }, '')

    return `
        <div class="description__column description__username">
            <div class="userName">
                ${this.options.firstName}<br>${this.options.lastName}
            </div>
            <div class="userGroup">
                
            </div>        
        </div>
        <div class="description__column description__userphoto" style="background: url('${this.options.img || 'no-photo.png'}') 50%/100% no-repeat;"></div>
        <div class="description__column description__userinfo">
        ${numberInfoContent}
        </div>
        <div class="false__field__wrapper" data-active='1'></div>
         <div class="description__column description__setting">
        <div class="setting_column description__newphone" data-new-phone-field="true"></div>
        <div class="setting_column description__editcard" data-edit-card="true"></div>
        <div class="setting_column description__delcard" data-del-card="true"></div>
      </div>`
  }
}