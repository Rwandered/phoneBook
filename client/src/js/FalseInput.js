import { setGroup } from "./requests/request"

export default class FalseInput {
    constructor(options) {
        this.selector = options.selector
        this.defaultText = options.defaultText
        this.groupId = options.groupId
        this.inputType = options.inputType || 'new'
        this.falseInput
        this.create()
    }


    create() {

        this.falseInput = toNode(this.defaultText)
        console.log('this.falseInput: ', this.falseInput)
        document.querySelector(`[${this.selector}]`).insertAdjacentElement(`afterbegin`, this.falseInput)
        this.falseInput.focus()
        this.falseInput.select()
        this.falseInput.selectionEnd = this.falseInput.selectionEnd = this.defaultText.length
        this.falseInput.addEventListener('focusout', this.send.bind(this))
        this.falseInput.addEventListener('keypress', () => { if (event.key === 'Enter') this.falseInput.blur() })
    }

    remove() {
        this.falseInput.remove()
    }

    destroy() {
        this.remove()
    }

    send() {
        //тут надо учесть метод update или new

        const falseInputValue = this.falseInput.value
        if (falseInputValue.length === 0) {
            return this.destroy()
        }
        // а тут метод по созданию новой li и запрос на сервер для добавления там новой группы
        // document.querySelector(`[data-false-input]`)

        // const $group = setGroup(falseInputValue)
        // console.log($group)
        // $group.then(result => {

        //     document.querySelector(`[${this.selector}]`)
        //         .insertAdjacentHTML('beforebegin', `
        //   <li data-list-el data-group-type=user data-removable="true" data-group-id=${result.group.id}>
        //   <p class=list-el-value>${falseInputValue}</p>
        //    <div class="groups__controls_wrapper ${ document.querySelector('.editing__mode') ? 'groups__controls_wrapper_show' : 'groups__controls_wrapper_hide'}">
        //      <div class="groups__edit_controls">
        //       <div class="rename_group">
        //       </div>
        //       <div class="delete_group">
        //       </div>
        //     </div>
        //    </div>           
        //   </li>`)

        // this.destroy()
        // })

    }

    update() {

    }


}

const toNode = txt => {
    const falseInput = document.createElement('input')
    falseInput.classList.add('inp_new_group')
    falseInput.type = 'text'
    falseInput.value = txt
    falseInput.maxLength = 15
    falseInput.placeholder = 'Max: 15 symbols'

    return falseInput
}