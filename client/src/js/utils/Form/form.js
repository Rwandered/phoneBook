import Slider from "../Slider/Slider";
import {setCardLogo} from "../../requests/request";
import {_getSliderItems} from "../WithSlider/withSlider";

const getHtml = () => {
  return `
  <div class="form__column form__logo logo logo__row">
   <div class="logo__img"></div>
   <div class="insert__img">
    <input class="phone__img_field" type="file" name="logo" style="opacity:0" data-card-logo>
   </div>
  </div>`
}


export const _getFormData = () => {
  const frm = document.querySelector('.form__flex__row')
  console.log('frm.elements: ', frm.elements);
  const gpValue = frm.querySelector('.select__input_text').textContent
  const formData = new FormData(frm)
  formData.set("groups", gpValue)

  return formData
}

export const formBody = (options) => {
  const form = document.createElement('form')
  form.classList.add('form__flex__row')
  form.enctype = 'multipart/form-data'

  form.insertAdjacentHTML('beforeend', getHtml())

  const sliderContainer = document.createElement('div')
  sliderContainer.classList.add('form__column', 'phone', 'phone__row')


  const slider = new Slider({
    selector: 'phone',
    sliderItems: _getSliderItems(options),
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