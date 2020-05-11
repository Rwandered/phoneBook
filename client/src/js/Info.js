import FalseFieldInfo from "./FalseFieldInfo"
import toUpperFistLetter from "./supporting/support"

export default class Info {
    constructor(options) {

        console.log(options)
        this.id = options.id
        this.options = options
        this.infoWrapper
        this.create()

    }


    create() {
        this.infoWrapper = document.createElement('div')
        this.infoWrapper.classList.add('description__row')
        this.infoWrapper.dataset.id = this.id
        this.infoWrapper.insertAdjacentHTML('beforeend', this.toHtml())

        this.infoWrapper.addEventListener('click', handler)
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
      <!-- блок с именем пользователя -->
        <div class="description__column description__username">${this.options.firstName}<br>${this.options.lastName}</div>
        <!-- блок с фото пользователя -->
        <div class="description__column description__userphoto" style="background: url('${this.options.img || 'no-photo.png'}') 50%/100% no-repeat;"></div>
        <!-- блок с номерами пользователя -->
        <div class="description__column description__userinfo">

        ${numberInfoContent}
        </div>
        <div class="false__field__wrapper" data-active='1'></div>
        <!-- блок с кнопочкой добавления номера пользователю и редактирвоания карточки-->
         <div class="description__column description__setting">
        <div class="setting_column description__newphone" data-new-phone-field="true"></div>
        <div class="setting_column description__editcard" data-edit-card="true"></div>
      </div>`
    }
}


const handler = () => {
    if (event.target.dataset.newPhoneField) {

        if (document.querySelector('.false__field__wrapper').dataset.active) {
            const falseFieldInfo = new FalseFieldInfo()
        }
    }
}