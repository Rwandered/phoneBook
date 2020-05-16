import '../styles/scss/style.scss'
import ListGroups from './ListGroups'
import Description from './Description'
import { getGroups } from './requests/request'



const groups = async() => await getGroups()
const description = new Description('phoneBook__row')


const createListBlock = async() => {
  try {
    const list = new ListGroups({ groups: await groups(), selector: 'phoneBook__row' })
    workWithBlock(list)
  } catch (err) {
    err => console.error("Get groups error: ", err)
  }
}

createListBlock()

const workWithBlock = element => {
  document.querySelector('.body').addEventListener('click', () => {

    if (event.target.closest('[data-menu]')) {
      description.close()
      element.show()
    } else if (event.target.closest('[data-card]')) {
      element.close()
      description.show()
    } else {
      description.close()
      element.close()
    }
  })
}



// const handler = () => {
//   console.log('Event target: ', event.target)
//   console.log('Block element: ', )
// }

// const menuBtn = document.querySelector('.header__menu')

// menuBtn.addEventListener('click', () => {

// })




// createListBlock()
// createInfoBlock()



// const body = new Body()
// const list = new ListGroups()
// const info = new Info()

// body.create('phoneBook__row')

// list.create('phoneBook__row')
// info.create('phoneBook__row')



// 1) страница загружается - создаются основное поле по центру
// 2) проверяется размер окна и в зависимости от размера если это мобильная 
// версия то создается окно которое слева и которое справа только без description__row
// 3) сразу же подгрузка с сервера всех карточек для группы all contacts
// 4) на кнопку меню показывать окно с группами
// 5) обработчики на группы для фильтра карточек
// 6) обработчики на кнопки на окне с группами
// 6.1) на кнопку new group простопоявляется новое поле для ввода новой группы в списке с группами 
// (в конце списка создается текстовое поле, получает value New group и фокус, при потере фокуса обновляется список
// добавляется новое название группы в список, убирается поле ввода, данные сохраняются на сервере)
// 6.2) Кнопка info__img - просто вылазит модалка с именем автора
// 6.3) Кнопка настроек setting__img - по клину по ней можно добавить в группу пользователей
//  тут необходимо чтобы была активна какая-либо группа - то есть когда кликаем по группам им дается атрибут 
// для определение активности
//7) при клике на карточку, если это мобильная версия то показываем дополнительную инфу - вылазит справа



// const cardWrapper = document.querySelector('.cards')

// cards.forEach(card => {
//   const newC = new Card(card)
//   cardWrapper.insertAdjacentHTML('beforeend', newC.newCard)
// })




// <!-- Элемент блока с карточками,
// блок самой карточки - это flex контейнер
// в нем есть фото, имя и номер телефона пользователя-->
// <div class="cards__card card">
//  <!-- Элемент карточки - фото пользователя
// отдельный блок фото будем в стилях -->
//  <div class="card__col card__img"></div>
//  <!-- Элемент карточки - краткие данные
//    о пользователе -->
//  <div class="card__col card__info">
//    <p class="name"><strong>Kyle Simpson</strong></p>
//    <p class="info"><strong>Austin, TX Getify Solutions</strong></p>
//  </div>
//  <!-- Элемент карточки - номер телефона -->
//  <div class="card__col card__number">
//    <p><strong>+49 176 458 4587</strong></p>
//  </div>
// </div>