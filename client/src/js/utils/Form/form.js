import Slider from "../Slider/Slider";
import {setCardLogo} from "../../requests/request";

export const _getFormData = () => {
  const frm = document.querySelector('.form__flex__row')
  return new FormData(frm)
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
                <div id="select"></div>
            </div>

            <div class=" phone__column ">
              <label for="info">Some information</label>
              <input class="phone__txt_field" type="text" name="info">
            </div>` ,

    `<div class="phone__column ">
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

export const formBody = () => {
  const form = document.createElement('form')
  form.classList.add('form__flex__row')
  form.enctype = 'multipart/form-data'

  form.insertAdjacentHTML('beforeend', `
  <div class="form__column form__logo logo logo__row">
   <div class="logo__img"></div>
   <div class="insert__img">
    <input class="phone__img_field" type="file" name="logo" style="opacity:0" data-card-logo>
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
  sliderContainer.insertAdjacentElement('beforeend', newSlider)
  form.insertAdjacentElement('beforeend', sliderContainer)

  const logoCardInput = form.querySelector('[data-card-logo]')
  console.log('logoCardInput: ', logoCardInput)

  logoCardInput.addEventListener('change', () => {
    setCardLogo(_getFormData()) //отравим запрос на сервер, чтобы сохранить выбранную картинку фото и сразу же ее отобразить
      // на фронте в then
      .then( res => {
        const logo = form.querySelector('.logo__img')
        logo.style.background = `url(${res.logo}) 50%/100% no-repeat`
      })
  })

  return form
}