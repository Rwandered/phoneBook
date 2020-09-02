import { getCards, getCardByGroup, deleteGroup } from "../../requests/request"
import Card from "../Card/Card"
import FalseInput from "../FalseInput/FalseInput"
import CEatingModal from "../Modal/CreatingModal/CreatingModal"


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

    groupsContainer.addEventListener('click', async event => {
      if (event.target.classList.contains('rename_group')) {
        if (!document.querySelector('.inp_new_group')) {
          const groupForRename = event.target.closest('[data-list-el]')
          const $groupForRename = groupForRename.querySelector('.list-el-value')
          this.updateInput = new FalseInput({
            selector: `data-group-id='${groupForRename.dataset.groupId}'`,
            defaultText: $groupForRename.textContent,
            inputType: 'update',
            groupId: +groupForRename.dataset.groupId,
          })
          $groupForRename.textContent = ''
        }

      } else if (event.target.classList.contains('delete_group')) {
         try {
          const $group = event.target.closest('[data-list-el]')
          if($group.classList.contains('active_list_el')) {
            const allCards = await getCards()
            groupsContainer.querySelector('[data-all-contact]').classList.add('active_list_el')
            document.querySelector('[data-gpname]').textContent = 'All Contacts'
            renderCard( allCards.data )
          }
          await deleteGroup(+$group.dataset.groupId)
          $group.remove()
        } catch (e) {
           console.log(e)
        }

      } else if (event.target.closest('[data-list-el]')) {
          const listElem = event.target.closest('[data-list-el]')

          // const allDataListEl = groupsContainer.querySelectorAll('.list-el-value')
          const allDataListEl = groupsContainer.querySelectorAll('[data-list-el]')
          allDataListEl.forEach(el => el.classList.remove('active_list_el'))
          event.target.closest('[data-list-el]').classList.add('active_list_el')

          document.querySelector('[data-gpname]').textContent = event.target.textContent
          const cards = !!listElem.dataset.allContact ? await getCards() : await getCardByGroup(listElem.dataset.groupId)
          // getCardByGroup - принимает id группы
          renderCard(cards.data)
          this.close()
      } else if (event.target.closest('[data-new-group]')) {

          new FalseInput({ selector: 'data-false-input', defaultText: 'New group' })

      } else if (event.target.closest('[data-setting]')) {
          CEatingModal()

      } else if (event.target.closest('[data-edit]')) {
          // получаем все элементы с корзиной, показывыаем их , скрываем кнопку с data edit и показываем кнопку data edit stop
          const [...removableItems] = document.querySelectorAll('[data-removable]')

          document.querySelector('.groups__listGroup').classList.add('upWidth')
          document.querySelector('.groups__listGroup').classList.remove('downWidth')

          removableItems.forEach(item => {
          item.lastElementChild.classList.add('appear')
          item.lastElementChild.classList.remove('disappear')
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
    <li data-all-contact='true' data-list-el data-group-type=system>
     <p class=list-el-value>All Contacts</p>
    </li>
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
  const $groupsList = groupsList
    .filter(group => group.name != 'All Contacts')
    .map(group => `
        <li data-list-el data-group-type=${group.type} data-removable="true" data-group-id=${group.id}>
        <p class=list-el-value>${group.name}</p>
         <div class="groups__controls_wrapper groups__controls_wrapper_hide">
          <div class="groups__edit_controls">
            <div class="rename_group "></div>
            <div class="delete_group "></div>
          </div>
         </div>
        </li>`)
    .join(' ')

  return $groupsList
}