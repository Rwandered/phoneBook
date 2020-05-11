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


// <!-- блок с именем пользователя -->
//   <div class="description__column description__username">Kyle<br>Simpson</div>
//   <!-- блок с фото пользователя -->
//   <div class="description__column description__userphoto"></div>
//   <!-- блок с номерами пользователя -->
//   <div class="description__column description__userinfo">
//     <p>Mobile phone:</p>
//     <p>+49 176 458 4587</p>
//     <p>Work phone:</p>
//     <p>+49 176 458 4587</p>
//     <p>Home phone:</p>
//     <p>+49 176 458 4587</p>
//   </div>
//   <!-- блок с кнопочкой добавления номера пользователю -->
//   <div class="description__column description__newphone"></div>



// <div class="description__row">
// <!-- блок с именем пользователя -->
// <div class="description__column description__username">Kyle<br>Simpson</div>
// <!-- блок с фото пользователя -->
// <div class="description__column description__userphoto"></div>
// <!-- блок с номерами пользователя -->
// <div class="description__column description__userinfo">
//     <p>Mobile phone:</p>
//     <p>+49 176 458 4587</p>
//     <p>Work phone:</p>
//     <p>+49 176 458 4587</p>
//     <p>Home phone:</p>
//     <p>+49 176 458 4587</p>
// </div>
// <!-- блок с кнопочкой добавления номера пользователю -->
// <div class="description__column description__newphone"></div>

// </div>





// <!-- Правая колонка с описанием по карточкам -->
// <div class="phoneBook__column phoneBook__description description">
//   <div class="description__row">
//     <!-- блок с именем пользователя -->
//     <div class="description__column description__username">Kyle<br>Simpson</div>
//     <!-- блок с фото пользователя -->
//     <div class="description__column description__userphoto"></div>
//     <!-- блок с номерами пользователя -->
//     <div class="description__column description__userinfo">
//       <p>Mobile phone:</p>
//       <p>+49 176 458 4587</p>
//       <p>Work phone:</p>
//       <p>+49 176 458 4587</p>
//       <p>Home phone:</p>
//       <p>+49 176 458 4587</p>
//     </div>
//     <!-- блок с кнопочкой добавления номера пользователю -->
//     <div class="description__column description__newphone"></div>

//   </div>
// </div>