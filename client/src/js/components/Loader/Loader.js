import './Loader.scss'

const toHTML = () => `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`

export default class Loader {
  constructor(selector) {

    this.targetNode = document.querySelector(selector)
    console.log('this.targetNode: ', this.targetNode)
    this.create()
  }
  create() {
    this.loader = document.createElement('div')
    this.loader.classList.add('loader')
    this.loader.insertAdjacentHTML('afterbegin', toHTML())
    this.targetNode.insertAdjacentElement('afterbegin', this.loader)

    this.show()
  }

  show() {
    this.loader.classList.remove('loader-hide')
    this.loader.classList.add('loader-show')
  }

  hide() {
    this.loader.classList.remove('loader-show')
    this.loader.classList.add('loader-hide')
    this.remove()
  }

  remove() {
    this.loader.remove()
  }
}