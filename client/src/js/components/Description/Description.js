export default class Description {
  constructor(selector) {
    this.selector = selector
    this.visible = false
    this.create()
  }

  create() {
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('phoneBook__column',
      'phoneBook__description',
      'description')
    document.querySelector(`.${this.selector}`).insertAdjacentElement('beforeend', infoContainer)
  }

  show() {
    const infoContainer = document.querySelector('.description')
    infoContainer.classList.remove('hide')
    infoContainer.classList.add('show')
    this.visible = true
  }


  close() {
    const infoContainer = document.querySelector('.description')
    infoContainer.classList.add('hide')
    if (this.visible) {
      this.visible = false
      setTimeout(() => {
        infoContainer.classList.remove('show')
        infoContainer.classList.remove('hide')
      }, 100)
    }
  }
}