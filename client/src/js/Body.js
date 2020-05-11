import ListGroups from "./ListGroups"
import Description from "./Description"

export default class Body {
    constructor() {}
    create(selector) {
        const bodyContainer = document.createElement('div')
        bodyContainer.classList.add('phoneBook__column', 'phoneBook__body', 'body')
        bodyContainer.insertAdjacentHTML('afterbegin', toHtml())
        document.querySelector(`.${selector}`).insertAdjacentElement('beforeend', bodyContainer)

        bodyContainer.addEventListener('click', handler)
    }
}

const handler = () => {
    if (event.target.closest('[data-menu]')) {
        new ListGroups().show()
    } else if (event.target.closest('[data-card]')) {
        new Info().show()
    }
}

const toHtml = () => {
    return `<div class="body__header header">
    <!-- первый flex элемент с иконкой группы и ее именем -->
    <div class="header__column header__img">
      <img src="groupLogo.png" alt="gpL">
      <p class="header__img_groupName" data-gpName><strong>All Contacts</strong></p>
    </div>
    <!-- второй flex элемент со строкой поиска
      и ее кнопкой показа -->
    <div class=" header__column header__search">
      <input class="search__string" type="text">
    </div>
    <!-- третий flex элемент с иконкой меню -->
    <div class="header__column header__menu" data-menu>
      <img src="menu.png" alt="Menu">
    </div>
    </div>
    <!-- Блок основновного контента данной колонки.
    Тут будут находиться карточки, при чем каждая 
    карточка это flex контейнер -->
    <div class="body__cards cards">
    <!-- ТУТ БЫЛА КАРТОЧКА -->
    </div>`
}


// <!-- Основная колонка в центре - идет в мобайл ферст -->
// <div class="phoneBook__column phoneBook__body body">
//   <!-- Блок заголовка колонки где будут 
//   кнопка меню, иконка группы и ее имя и строка поиска,
//  которая будет выдвигаться при нажатии на кнопку поиска
// это будет flex контейнер -->
// <div class="body__header header">
//   <!-- первый flex элемент с иконкой группы и ее именем -->
//   <div class="header__column header__img">
//     <img src="groupLogo.png" alt="gpL">
//     <p class="header__img_groupName" data-gpName><strong>All Contacts</strong></p>
//   </div>
//   <!-- второй flex элемент со строкой поиска
//     и ее кнопкой показа -->
//   <div class=" header__column header__search">
//     <input class="search__string" type="text">
//   </div>
//   <!-- третий flex элемент с иконкой меню -->
//   <div class="header__column header__menu">
//     <img src="menu.png" alt="Menu">
//   </div>
// </div>
// <!-- Блок основновного контента данной колонки.
// Тут будут находиться карточки, при чем каждая 
// карточка это flex контейнер -->
// <div class="body__cards cards">
//   <!-- ТУТ БЫЛА КАРТОЧКА -->
// </div>
// </div>