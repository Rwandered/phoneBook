import Info from "../Info/Info"
import { getCardById } from "../../requests/request"
import {notify} from "../../utils/Notify/notifyUtils";

export default class Card {
  constructor(options) {
    this.img = options.img || 'no-photo.png'
    this.id = options.id
    // this.img = 'no-photo.png'
    this.firstName = options.firstName
    this.lastName = options.lastName
    this.info = options.info
    this.numbers = options.numbers
    this.options = options


  }

  newCard() {
    const cardWrapper = document.createElement('div')
    cardWrapper.classList.add('cards__card', 'card')
    cardWrapper.dataset.id = this.id
    cardWrapper.dataset.card = ''
    cardWrapper.insertAdjacentHTML('beforeend', this.toHtml())



    cardWrapper.addEventListener('click', async() => {
      try {
        document.querySelector('.phoneBook__description')
          .childNodes.forEach(e => e.remove())
        //прежде чем создавать новое поле информации надо подгрузить данные о карточке, это нужно в случае, если добавили номер или
        // его изменили, и нужно доабвить новые данные с сервера
        const cardOptions = await getCardById(this.id)
        new Info(cardOptions.data)
      }catch (error) {
        notify.show(error)
      }
    })
    return cardWrapper
  }

  toHtml() {
    return `
      <div class="card__col card__img" style="background: url('${this.img}') 50%/100% no-repeat;"></div>
        <div class="card__col card__info">
          <p class="name"><strong>${this.firstName} ${this.lastName}</strong></p>
          <p class="info"><strong>${this.info}</strong></p>
        </div>
        <div class="card__col card__number">
        <p>
          <strong>${
            this.numbers.find(number => number.type === 'mobile').number
          }</strong>
        </p>
      </div>`
  }
}