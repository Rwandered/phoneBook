import ListGroups from './components/ListGroups/ListGroups'
import Description from './components/Description/Description'
import { getGroups } from './requests/request'
import '../styles/scss/style.scss'


const groups = async () => await getGroups()
const description = new Description('phoneBook__row')

const createListBlock = async() => {
  try {
    const list = new ListGroups({ groups: await groups(), selector: 'phoneBook__row' })
    workWithBlock(list)
  } catch (err) {
    return err => console.error("Get groups error: ", err)
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