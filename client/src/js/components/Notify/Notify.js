import './Notify.scss'

const toHTML = (value) => {
  return `<p>${value}</p>`
}

export default class Notify {
  constructor( {timeout} ) {
    this.timeout = timeout
    this.create()
  }

  create() {
    this.notifyWrapper = document.createElement('div')
    const body = document.querySelector('.body')
    this.notifyWrapper.classList.add('notify')
    body.insertAdjacentElement('beforeend', this.notifyWrapper )
    this.hide()
  }

  show(notification) {
    this.hide()
    this.notifyWrapper.classList.add('notify_show')
    this.notifyWrapper.innerHTML = toHTML(notification)

    setTimeout( () => {
      this.hide()
    }, this.timeout)
  }

  hide() {
    this.notifyWrapper.classList.toggle('notify_hide')
  }

  destroy() {
    this.notifyWrapper.remove()
  }
}