import { addPhone } from "./requests/request"
import toUpperFistLetter from "./supporting/support"

export default class FalseFieldInfo {
  constructor(selector) {
    this.selector = selector || 'false__field__wrapper'
    this.falseFieldInfo
    this.falseFieldInfoWrapper
    this.create()
  }


  create() {
    this.falseFieldInfo = toNode()
    this.falseFieldInfoWrapper = document.querySelector(`.${this.selector}`)
    this.falseFieldInfoWrapper.insertAdjacentElement('afterbegin', this.falseFieldInfo)
    this.falseFieldInfoWrapper.dataset.active = ''
    this.falseFieldInfo.typeNumber.focus()
    this.falseFieldInfo.addEventListener('click', () => {
      if (event.target.dataset.fieldOk) {
        this.send()
      } else if (event.target.dataset.fieldCancel) {
        this.destroy()
      }
    })
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
    // if (!typeNumber.value === '' && !number.value === '') {
    const userInfoField = document.querySelector(`.description__userinfo`)
    const cardId = userInfoField.closest('[data-id]').dataset.id
    addPhone({
      id: cardId,
      data: {
        type: typeNumber.value,
        number: number.value
      }
    })

    userInfoField.insertAdjacentHTML('beforeend',
      ` <div class="number__info">
     <p>${toUpperFistLetter(typeNumber.value)} phone:</p>
     <p>${number.value}</p>
    </div>`)
    userInfoField.scrollTop = userInfoField.scrollHeight
    this.destroy()
    // }
  }
}

const toNode = () => {
  const falseInput = document.createElement('form')

  falseInput.insertAdjacentHTML('beforeend',
    `
         <input class="false_field" type="text" value="" name="typeNumber" placeholder="Type of number">
         <input class="false_field" type="tel" value="" name="number" placeholder="Number">
         <div class="false_field_ok_btn" data-field-ok='true'></div>
         <div class="false_field_cancel_btn" data-field-cancel='true'></div>
         `)

  return falseInput
}