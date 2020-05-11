import { getCards, getCardByGroup } from "./requests/request"
import Card from "./Card"
import FalseInput from "./FalseInput"
import modalComponent from "./components/modalComponent"

export default class ListGroups {
    constructor({ groups, selector }) {
        this.listElement = groups.data
        this.selector = selector
        this.visible = false
        this.create()
    }

    create() {
        const groupsContainer = document.createElement('div')
        groupsContainer.classList.add('phoneBook__column', 'phoneBook__groups', 'groups')
        groupsContainer.insertAdjacentHTML('afterbegin', toHtml(this.listElement))
        document.querySelector(`.${this.selector}`).insertAdjacentElement('beforeend', groupsContainer)

        groupsContainer.addEventListener('click', async() => {
            if (event.target.classList.contains('rename_group')) {
                console.log(event.target)
            } else if (event.target.classList.contains('delete_group')) {
                console.dir(event.target)
                    // удаляем из отображения группу и удаляем ее с сервера, плю удаляем ее из списка у карточек пользователя
                event.target.closest('[data-list-el]').remove()

            } else if (event.target.closest('[data-list-el]')) {
                const allDataListEl = groupsContainer.querySelectorAll('[data-list-el]')
                allDataListEl.forEach(el => el.classList.remove('active_list_el'))
                event.target.classList.add('active_list_el')
                document.querySelector('[data-gpname]').textContent = event.target.textContent
                const cards = !!event.target.dataset.allContact ? await getCards() : await getCardByGroup(event.target.textContent)
                renderCard(cards.data)
                this.close()
            } else if (event.target.closest('[data-new-group]')) {
                // console.log(event.target)
                new FalseInput({ selector: 'data-false-input', defaultText: 'New group' })
                    // console.log(falseInput)
            } else if (event.target.closest('[data-setting]')) {
                //тут можно создавать модальку
                modalComponent()
            } else if (event.target.closest('[data-edit]')) {
                // получаем все элементы с корзиной, показывыаем их , скрываем кнопку с data edit и показываем кнопку data edit stop
                const [...removableItems] = document.querySelectorAll('[data-removable]')

                document.querySelector('.groups__listGroup').classList.add('upWidth')
                document.querySelector('.groups__listGroup').classList.remove('downWidth')

                removableItems.forEach(item => {

                    // item.lastElementChild.style.display = 'initial'
                    // item.lastElementChild.classList.add('groups__controls_wrapper_show')
                    // item.lastElementChild.classList.remove('groups__controls_wrapper_hide')
                    item.lastElementChild.classList.add('appear')
                    item.lastElementChild.classList.remove('disappear')


                    // new FalseInput( {
                    //  selector: ,
                    //  defaultText: 
                    // })
                })



                groupsContainer.querySelector('[data-ls]').classList.add('editing__mode')
                event.target.style.display = 'none'
                groupsContainer.querySelector('[data-edit-stop]').style.display = 'inline-block'

                //=======================
                // увеличить размер  радительского блока
                event.target.closest('.groups').classList.add('increaseWidth')
                event.target.closest('.groups').classList.remove('decreaseWidth')


            } else if (event.target.closest('[data-edit-stop]')) {
                const [...removableItems] = document.querySelectorAll('[data-removable]');
                removableItems.forEach(item => {

                    item.lastElementChild.classList.add('disappear')
                    item.lastElementChild.classList.remove('appear')
                })
                groupsContainer.querySelector('[data-ls]').classList.remove('editing__mode')
                event.target.style.display = 'none'
                groupsContainer.querySelector('[data-edit]').style.display = 'inline-block'

                event.target.closest('.groups').classList.add('decreaseWidth')
                event.target.closest('.groups').classList.remove('increaseWidth')

                document.querySelector('.groups__listGroup').classList.add('upWidth')
            }
        })
    }

    show() {
        const groupsContainer = document.querySelector('.groups')
        groupsContainer.classList.remove('decreaseWidth')
        groupsContainer.classList.add('show')
        groupsContainer.classList.remove('hide')
        this.visible = true
    }


    close() {
        const groupsContainer = document.querySelector('.groups')
        groupsContainer.classList.add('hide')

        if (this.visible) {
            this.visible = false
            setTimeout(() => {
                groupsContainer.classList.remove('show')
                groupsContainer.classList.remove('hide')
            }, 100)
        }
    }
}

export const renderCard = cardsArray => {

    const cardWrapper = document.querySelector('.cards')
    const r = [...cardWrapper.children].forEach(e => e.remove())

    for (const card of cardsArray) {
        const newC = new Card(card)
        cardWrapper.insertAdjacentElement('beforeend', newC.newCard())
    }
}

const toHtml = list => {
    return `<div class="groups__row">
  <!--Элемент для кнопочки добавить группу -->
  <div class="groups__column groups__newGroup" data-new-group></div>
  <!--Элемент для списка групп -->
  <div class="groups__column groups__listGroup">
    <ul data-ls>
    <li data-all-contact='true' data-list-el data-group-type=system>All Contacts </li>
     ${toLi(list)}
    <li data-false-input></li>
    </ul>
 </div>
  
  <!--Элемент для кнопочек настроек в этих настройках
    можно будет добавлять людей в выделенную группу -->
  <div class="groups__column groups__setting">
    <div class="setting_column setting__img" data-setting></div>
    <div class="setting_column edit__img" data-edit></div>
    <div class="setting_column edit__stop__img" data-edit-stop></div>
  </div>
</div>`
}

const toLi = groupsList => {
    console.log('groupsList: ', groupsList)
    const $groupsList = groupsList.filter(group => group.name != 'All Contacts')
        .map(group => `
        <li data-list-el data-group-type=${group.type} data-removable="true" data-group-id=${group.id}>${group.name}
         <div class="groups__controls_wrapper groups__controls_wrapper_hide">
          <div class="groups__edit_controls">
            <div class="rename_group "></div>
            <div class="delete_group "></div>
          </div>
         </div>
        </li>`).join(' ')

    return $groupsList
}