export default class Modal {
  constructor(options) {
    // this.width = options.width || '220px'
    // this.height = options.width || '570px'
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

  }

  close() {
    //на самом деле тут надо будет скрывать модалку через анимацию и потом удалять ее в settimeout
    this.modal.remove()
  }

  destroy() {

  }
}

function noop() {}

const _getModalLayer = () => {
  const modalLayer = document.createElement('div')
  modalLayer.classList.add('modal__layer')
  return modalLayer
}

const _getModalWrapper = () => {
  const modalWrapper = document.createElement('div')
  modalWrapper.classList.add('modal__window')
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

// `
// <div class="modal__layer">
// <div class="modal__window">

//  <div classs="modal__row">

//     <div class="modal__header modal__column">
//       <span class="modal__title">New card</span>
//       <span class="modal__close" data-close='true'>&times</span>
//     </div>

//     <div class="modal__column modal__body">


//     <form action class="form__flex__row">
//     <div class="form__column form__logo logo logo__row">

//       <div class="logo__img">

//       </div>

//       <div class="insert__img">

//       </div>

//     </div>

//     <div class="form__column phone phone__row">
//       <div class="phone__colunm">
//         <label for="">Mobile phone</label>
//         <input class="phone__txt_field" type="tel" name="m_phone">
//       </div>

//       <div class="phone__colunm">
//         <label for="">Work phone</label>
//         <input class="phone__txt_field" type="tel" name="w_phone">
//       </div>

//       <div class="phone__colunm">
//         <label for="">Home phone</label>
//         <input class="phone__txt_field" type="tel" name="h_phone">
//       </div>

//     </div>
//     </form>



//     </div>



//     <div class="modal__footer modal__column">
//     <div class="modal__ok_btn"></div>
//     <div class="modal__cancel_btn"></div>
//  </div>


// </div>
// </div>
// </div>
// `



// // modal content
// `        <form action class="form__flex__row">
// <div class="form__column form__logo logo logo__row">

//   <div class="logo__img">

//   </div>

//   <div class="insert__img">

//   </div>

// </div>

// <div class="form__column phone phone__row">
//   <div class="phone__colunm">
//     <label for="">Mobile phone</label>
//     <input class="phone__txt_field" type="tel" name="m_phone">
//   </div>

//   <div class="phone__colunm">
//     <label for="">Work phone</label>
//     <input class="phone__txt_field" type="tel" name="w_phone">
//   </div>

//   <div class="phone__colunm">
//     <label for="">Home phone</label>
//     <input class="phone__txt_field" type="tel" name="h_phone">
//   </div>

// </div>
// </form>`


// ==================================
// ==================================
//  const getSlider = () => {
//  const sliderWrapper = document.querySelector('.slider__wrapper') // обертка для .slider-item
//  const sliderItems = document.querySelectorAll('.slider__item') // элементы (.slider-item)


//  const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width) // ширина обёртки
//  const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width) // ширина одного элемента    



//  let indicatorItems
//  let maxIndexIndicator = sliderItems.length - 1
//  let indexIndicator = 0
//  let transform = 0 // значение трансформации .slider_wrapper
//  let step = itemWidth / wrapperWidth * 100 // величина шага (для трансформации)
//  let positionLeftItem = 0 // позиция левого активного элемента   
//  let items = [] // массив элементов

//  console.log('обертка слайдера: ', sliderWrapper)
//  console.log('Slider items: ', sliderItems)
//  console.log('Wrapper width: ', wrapperWidth)
//  console.log('Item width: ', itemWidth)
//  console.log('Step: ', step)

//  // наполнение массива _items
//  sliderItems.forEach((item, index) => {
//    items.push({ item: item, position: index, transform: 0 })
//  })

//  console.log('Items: ', items)

//  // const position = {
//  //   getMin: 0,
//  //   getMax: items.length - 1,
//  // }

//  const position = {
//    getItemMin: function() {
//      let indexItem = 0;
//      items.forEach(function(item, index) {
//        if (item.position < items[indexItem].position) {
//          indexItem = index;
//        }
//      });
//      return indexItem;
//    },
//    getItemMax: function() {
//      var indexItem = 0;
//      items.forEach(function(item, index) {
//        if (item.position > items[indexItem].position) {
//          indexItem = index;
//        }
//      });
//      return indexItem;
//    },
//    getMin: function() {
//      return items[position.getItemMin()].position;
//    },
//    getMax: function() {
//      return items[position.getItemMax()].position;
//    }
//  }

//  console.log('Position: ', position)


//  const transformItem = direction => {

//   console.log('Wrapper width: ', wrapperWidth)
//   console.log('item width: ', itemWidth)

//    let nextItem, currentIndicator = indexIndicator;

//    if (direction === 'right') {
//      positionLeftItem++;
//      if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
//        nextItem = position.getItemMin();
//        items[nextItem].position = position.getMax() + 1;
//        items[nextItem].transform += items.length * 100;
//        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
//      }
//      transform -= step;
//      indexIndicator = indexIndicator + 1;
//      if (indexIndicator > maxIndexIndicator) {
//        indexIndicator = 0;
//      }
//    }
//    if (direction === 'left') {
//      positionLeftItem--;
//      if (positionLeftItem < position.getMin()) {
//        nextItem = position.getItemMax();
//        items[nextItem].position = position.getMin() - 1;
//        items[nextItem].transform -= items.length * 100;
//        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
//      }
//      transform += step;
//      indexIndicator = indexIndicator - 1;
//      if (indexIndicator < 0) {
//        indexIndicator = maxIndexIndicator;
//      }
//    }
//    sliderWrapper.style.transform = 'translateX(' + transform + '%)';
//    indicatorItems[currentIndicator].classList.remove('active');
//    indicatorItems[indexIndicator].classList.add('active');
//  }

//  const slideTo = to => {
//    let i = 0,
//      direction = (to > indexIndicator) ? 'right' : 'left';
//    while (to !== indexIndicator && i <= maxIndexIndicator) {
//      transformItem(direction);
//      i++;
//    }
//  }


//  const controlClick = event => {
//    if (event.target.classList.contains('slider__control')) {
//      event.preventDefault()
//      const direction = event.target.classList.contains('slider__control_right') ? 'right' : 'left'
//      transformItem(direction)
//    }
//    if (event.target.getAttribute('data-slide-to')) {
//      event.preventDefault()
//      slideTo(parseInt(event.target.getAttribute('data-slide-to')))
//    }
//  }



//  const addIndicators = () => {
//    const sliderIndicators = document.createElement('ol');
//    sliderIndicators.classList.add('slider__indicators');
//    for (let i = 0; i < sliderItems.length; i++) {
//      const sliderIndicatorsItem = document.createElement('li');
//      if (i === 0) {
//        sliderIndicatorsItem.classList.add('active');
//      }
//      sliderIndicatorsItem.setAttribute("data-slide-to", i);
//      sliderIndicators.appendChild(sliderIndicatorsItem);
//    }
//    document.querySelector('.slider').appendChild(sliderIndicators);
//    indicatorItems = document.querySelector('.slider').querySelectorAll('.slider__indicators > li')
//  }

//  // добавляем индикаторы
//  addIndicators();

//  document.querySelector('.phone__row').addEventListener('click', controlClick)


// }