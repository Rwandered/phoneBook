const noop = () => {}

const _getModalLayer = () => {
  const modalLayer = document.createElement('div')
  modalLayer.classList.add('modal__layer')
  return modalLayer
}

const _getModalWrapper = () => {
  const modalWrapper = document.createElement('div')
  modalWrapper.classList.add('modal__window')
  modalWrapper.tabIndex = 0
  return modalWrapper
}

const _getModalRow = () => {
  const modalRow = document.createElement('div')
  modalRow.classList.add('modal__row')
  return modalRow
}

const _getModalHeader = content => {
  return `
   <div class="modal__header modal__column">
    <span class="modal__title">${content.title || 'Modal window'}</span>
    ${content.closable ? `<span class="modal__close" data-close='true'>&times</span>` : ''}
   </div>`
}

const _getModalFooter = buttons => {
  const $modalFooter = document.createElement('div')
  $modalFooter.classList.add('modal__footer', 'modal__column')
  buttons.forEach(button => {
    const $button = document.createElement('div')
    $button.classList.add(`modal__${button.type}_btn`)
    $button.onclick = button.handler || noop
    $modalFooter.insertAdjacentElement('beforeend', $button)
  })
  return $modalFooter
}


export default class Modal {
  constructor(options) {
    this.title = options.title
    this.closable = options.closable
    this.buttons = options.buttons
    this.handler = options.handler
    this.body = options.body || '<p>Empty modal window</p>'
    this.entry = options.entry
    this.open()
  }

  open() {

    const modalLayer = this.modal = _getModalLayer()
    const modalWrapper = _getModalWrapper()
    const modalRow = _getModalRow()
    const modalHeader = _getModalHeader({
      title: this.title,
      closable: this.closable
    })

    const modalFooter = _getModalFooter(this.buttons)
    modalRow.insertAdjacentHTML('afterbegin', modalHeader)
    modalRow.insertAdjacentElement('beforeend', this.body)
    modalRow.insertAdjacentElement('beforeend', modalFooter)
    modalWrapper.insertAdjacentElement('beforeend', modalRow)
    modalWrapper.focus()
    modalLayer.insertAdjacentElement('beforeend', modalWrapper)
    document.querySelector(`.${this.entry || 'phoneBook'}`)
      .insertAdjacentElement('beforeend', modalLayer)


    modalLayer.addEventListener('click', event => {
      if (event.target.closest('[data-close]')) {
        this.close()
      }
      if (event.target.classList.contains('modal__layer')) {
        this.close()
      }
    })

    const submitBtn = this.buttons.find( button => button.type === 'submit')
    this.sumbitHandler = submitBtn ? submitBtn.handler : null
    this.selHandle = this.submit.bind(this)
    this.sumbitHandler && document.body.addEventListener('keypress', this.selHandle)
  }

  submit() {
    event.code === 'Enter' &&  this.sumbitHandler()
    document.body.removeEventListener('keypress', this.selHandle)
  }

  close() {
    this.modal.remove()
  }

  destroy() {}
}