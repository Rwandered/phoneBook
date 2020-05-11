import Modal from "../Modal"
import { setCard, getCards, getCardByGroup } from "../requests/request"
import Slider from "../components/Slider"
import { renderCard } from "../ListGroups"

export default function modalComponent() {

    const modalWindow = new Modal({
        title: 'Create card',
        closable: true,
        buttons: [{
                text: 'Ok',
                type: 'ok',
                handler() {
                    setCard(_getFormData())
                        .then(async res => {
                            const logo = document.querySelector('.logo__img')
                            logo.style.background = `url(${res.card.img}) 50%/100% no-repeat`
                            console.log(res)

                            const activeGroup = document.querySelector('.active_list_el')
                            if (activeGroup) {
                                let cards
                                if (activeGroup.dataset.allContact) {
                                    cards = await getCards()
                                    renderCard(cards.data)
                                } else if (activeGroup.textContent === res.card.group) {
                                    cards = await getCardByGroup(activeGroup.textContent)
                                    renderCard(cards.data)
                                }
                            }

                        })
                }
            },
            {
                text: 'Cancel',
                type: 'cancel',
                handler() {
                    modalWindow.close()
                }
            }
        ],
        entry: 'phoneBook',
        body: _getFormBody()
    })


}


const _getHtmlForModal = () => {
    return `
  <form action class="form__flex__row" enctype="multipart/form-data">
  
  <div class="form__column form__logo logo logo__row">

    <div class="logo__img"></div>
    
    <div class="insert__img">
      <input class="phone__img_field" type="file" name="logo" style="opacity:0">
    </div>

  </div>


  <div class="form__column phone phone__row">  
    
  </div>

   <!-- <a class="slider__control slider__control_left slider__control_show" href="#" role="button">&lt</a>
    <a class="slider__control slider__control_right slider__control_show" href="#" role="button">&gt</a> -->

  </div>

</form>`
}

const _getFormBody = () => {
    const form = document.createElement('form')
    form.classList.add('form__flex__row')
    form.enctype = 'multipart/form-data'

    form.insertAdjacentHTML('beforeend', `  
  <div class="form__column form__logo logo logo__row">
   <div class="logo__img"></div>
   <div class="insert__img">
    <input class="phone__img_field" type="file" name="logo" style="opacity:0">
   </div>
  </div>`)

    const sliderContainer = document.createElement('div')
    sliderContainer.classList.add('form__column', 'phone', 'phone__row')


    const slider = new Slider({
        selector: 'phone',
        sliderItems: _getSliderItems(),
        indicator: true,
    })

    const newSlider = slider.create()
        // console.log(newSlider)

    sliderContainer.insertAdjacentElement('beforeend', newSlider)
    form.insertAdjacentElement('beforeend', sliderContainer)

    return form

}

const _getFormData = () => {
    const frm = document.querySelector('.form__flex__row')
    const formData = new FormData(frm)
    return formData
        // formData.append('mobile', frm.m_phone.value)
        // formData.append('home', frm.h_phone.value)
        // formData.append('work', frm.w_phone.value)
        // formData.append('info', frm.some_info.value)
        // formData.append('img', frm.img_phone.value)
}

const _getSliderItems = () => {
    return [`
<div class="phone__column">
 <label for="firstName">First name</label>
 <input class="phone__txt_field" type="text" name="firstName" required>
</div>

<div class="phone__column">
 <label for="lastName">Last name</label>
 <input class="phone__txt_field" type="text" name="lastName" required>
</div>

<div class="phone__column">
 <label for="group">Group</label>
 <input class="phone__txt_field" type="text" name="group" required>
</div>`,
        `
        <div class=" phone__column ">
 <label for="info">Some information</label>
 <input class="phone__txt_field" type="text" name="info">
</div> 

<div class="phone__column ">
 <label for="mobile">Mobile phone</label>
 <input class="phone__txt_field" type="text" name="mobile">
</div> 

<div class="phone__column ">
 <label for="home">Home phone</label>
 <input class="phone__txt_field" type="text" name="home">
</div> 

<div class="phone__column ">
 <label for="work">Work phone</label>
 <input class="phone__txt_field" type="text" name="work">
</div>`
    ]
}




{
    /* <div class="slider">

    <div class="slider__wrapper"> <!--этот контейнер содержит элементы слайдера и он flex-->

      <div class="slider__item">
        
        <div class="phone__column">
          <label for="firstName">First name</label>
          <input class="phone__txt_field" type="text" name="firstName">
        </div>

        <div class="phone__column">
          <label for="lastName">Last name</label>
          <input class="phone__txt_field" type="text" name="lastName">
        </div>

        <div class="phone__column">
          <label for="group">Group</label>
          <input class="phone__txt_field" type="text" name="group">
        </div>

      </div>

      <div class="slider__item">

        <div class=" phone__column ">
          <label for="info">Some information</label>
          <input class="phone__txt_field" type="text" name="info">
        </div> 

        <div class="phone__column ">
          <label for="mobile">Mobile phone</label>
          <input class="phone__txt_field" type="text" name="mobile">
        </div> 

        <div class="phone__column ">
          <label for="home">Home phone</label>
          <input class="phone__txt_field" type="text" name="home">
        </div> 

        <div class="phone__column ">
          <label for="work">Work phone</label>
          <input class="phone__txt_field" type="text" name="work">
        </div>  

      </div> 

    <!-- Тут можно дальше добавлять карточки -->

    </div> */
}