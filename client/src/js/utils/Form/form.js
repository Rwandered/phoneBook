import Slider from "../Slider/Slider";
import {setCardLogo} from "../../requests/request";

export const _getFormData = () => {
  const frm = document.querySelector('.form__flex__row')
  console.log('frm.elements: ', frm.elements);
  const gpValue = frm.querySelector('.select__input_text').textContent
  const formData = new FormData(frm)
  formData.set("groups", gpValue)

  return formData
}

const _getSliderItems = (params) => {
  console.log('params: ', params)
  const paramsLength = params && Object.keys(params).length + params.numbers.length - 1
  const slideCounts = Math.ceil(paramsLength / 4)
  console.log('slideCounts: ', slideCounts)
  console.log('paramsLength: ', paramsLength)


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

  `        <div class="phone__column ">
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

export const formBody = (options) => {
  console.log('options: ', options)
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


  const params = options && {
    firstName: options.firstName,
    lastName: options.lastName,
    img: options.img,
    info: options.info,
    numbers: options.numbers,
  }

  const slider = new Slider({
    selector: 'phone',
    sliderItems: _getSliderItems(params),
    indicator: true,
  })

  const newSlider = slider.create()
  sliderContainer.insertAdjacentElement('beforeend', newSlider)
  form.insertAdjacentElement('beforeend', sliderContainer)

  const logoCardInput = form.querySelector('[data-card-logo]')

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