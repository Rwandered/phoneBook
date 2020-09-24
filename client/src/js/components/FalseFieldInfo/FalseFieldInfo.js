import { addPhone } from "../../requests/request"
import toUpperFistLetter from "../../utils/Text/text"
import {notify} from "../../utils/Notify/notifyUtils";

export default class FalseFieldInfo {
  constructor(selector) {
    this.selector = selector || 'false__field__wrapper'
    this.create()
  }


  create() {
    this.falseFieldInfo = toNode()
    this.falseFieldInfoWrapper = document.querySelector(`.${this.selector}`)
    this.falseFieldInfoWrapper.insertAdjacentElement('afterbegin', this.falseFieldInfo)
    this.falseFieldInfoWrapper.dataset.active = ''
    this.falseFieldInfo.typeNumber.focus()

    this.falseFieldInfo.addEventListener('submit', (event) => {
      event.preventDefault()
        this.send()
    })

    this.falseFieldInfo
      .querySelector('.false_field_cancel_btn')
      .addEventListener( 'click', () => this.destroy())
  }

  remove() {
    this.falseFieldInfoWrapper.dataset.active = 1
    this.falseFieldInfo.remove()
  }

  destroy() {
    this.remove()
  }

  send() {
    const [typeNumber, number] = [...this.falseFieldInfo.elements]
    const userInfoField = document.querySelector(`.description__userinfo`)
    const cardId = userInfoField.closest('[data-id]').dataset.id
    addPhone({
      id: cardId,
      data: {
        type: typeNumber.value.trim(),
        number: number.value.trim()
      }
    })
      .then( () => notify.show('Phone has been added...'))
      .catch( error => notify.show(error))

    userInfoField.insertAdjacentHTML('beforeend',
      ` <div class="number__info">
     <p>${toUpperFistLetter(typeNumber.value)} phone:</p>
     <p>${number.value}</p>
    </div>`)
    userInfoField.scrollTop = userInfoField.scrollHeight
    this.destroy()
  }
}

const toNode = () => {
  const falseInput = document.createElement('form')

  falseInput.insertAdjacentHTML('beforeend',
    `
         <input class="false_field" type="text" value="" name="typeNumber" placeholder="Type of number" required>
         <input class="false_field" type="tel" value="" name="number" placeholder="Number" required>
         <button type="submit" class="false_field_ok_btn" data-field-ok='true'></button>
         <button class="false_field_cancel_btn" data-field-cancel='true'></button>
         `)

  return falseInput
}