export default class Slider {
    constructor(options) {

        this.selector = options.selector
        this.sliderItems = options.sliderItems // массив из html элементов которые будут формировать слайдер - это будут элементы слайдеры
        this.items = [] // массив элементов
        this.sliderIndicator = true

        this.sliderWrapperWidth = options.sliderWrapperWidth || 215
        this.sliderItemWidth = options.sliderItemWidth || 215

        this.sliderWrapper

        this.sliderItemPosition
        this.transformStep = this.sliderItemWidth / this.sliderWrapperWidth * 100 // величина шага (для трансформации)
        this.transformValue = 0 // значение трансформации .slider_wrapper
        this.positionLeftItem = 0

        this.indicatorItems = []
        this.maxIndexIndicator = this.sliderItems.length - 1
        this.indexIndicator = 0

        this.touchStartX = 0

        // let indicatorItems
        // let maxIndexIndicator = sliderItems.length - 1
        // let indexIndicator = 0
        // let transform = 0 // значение трансформации .slider_wrapper
        // let step = itemWidth / wrapperWidth * 100 // величина шага (для трансформации)
        // let positionLeftItem = 0 // позиция левого активного элемента   


        // console.log('Селектор: ', this.selector)
        // console.log('Элементы слайдера: ', this.sliderItems)
    }

    create() {
        const sliderLayer = document.createElement('div')
        sliderLayer.classList.add('slider__layer')

        const slider = document.createElement('div')
        slider.classList.add('slider')
        this.sliderWrapper = document.createElement('div')
        this.sliderWrapper.classList.add('slider__wrapper')

        // console.log('Slider item from class: ', this.sliderItems)

        this.sliderItems.forEach((item, index) => {

            const sliderItem = document.createElement('div')
            sliderItem.classList.add('slider__item')
            sliderItem.insertAdjacentHTML('beforeend', item)

            this.items.push({ item: sliderItem, position: index, transform: 0 })

            this.sliderWrapper.insertAdjacentElement('beforeend', sliderItem)
        })

        // console.log('Все элементы в items: ', this.items)

        this.sliderItemPosition = {
            //получим элемент с минимальным значением ключа position
            getItemWithMinPosition: () => this.items.reduce((ac, item) => (ac.position < item.position) ? ac : item),

            //получим элемент с максимальным значением ключа position
            getItemWithMaxPosition: () => this.items.reduce((ac, item) => (ac.position > item.position) ? ac : item),

            //получим значение ключа position у элемента с минимальным значением position
            getMinPosition: () => this.sliderItemPosition.getItemWithMinPosition().position,

            //получим значение ключа position у элемента с максимальным значением position
            getMaxPosition: () => this.sliderItemPosition.getItemWithMaxPosition().position,
        }


        const sliderControls = _getSliderControls()

        slider.insertAdjacentElement('beforeend', this.sliderWrapper)

        if (this.sliderIndicator) {
            const sliderIndicators = _createIndicators(this.sliderItems.length, this)
            slider.insertAdjacentElement('beforeend', sliderIndicators)
        }

        sliderLayer.insertAdjacentElement('beforeend', slider)

        sliderLayer.insertAdjacentHTML('beforeend', sliderControls)


        sliderLayer.addEventListener('click', () => {
            // console.log(this)
            if (event.target.classList.contains('slider__control')) {
                event.preventDefault()
                const direction = event.target.classList.contains('slider__control_right') ? 'right' : 'left'
                this.transform(direction)
            }
            if (event.target.closest('[data-slide-to]')) {
                event.preventDefault()
                _slideTo(+event.target.dataset.slideTo, this)
            }
        })

        // slider.addEventListener('touchstart', () => {
        //     this.touchStartX = e.changedTouches[0].clientX
        // })

        // slider.addEventListener('touchend', () => {
        //     const touchEndX = e.changedTouches[0].clientX
        //     const touchDeltaX = touchEndX - this.touchStartX;
        //     if (touchDeltaX > 50) {
        //         this.transform('left');
        //     } else if (touchDeltaX < -50) {
        //         this.transform('right');
        //     }
        // })


        return sliderLayer
    }


    transform(direction) {

        let currentIndicator = this.indexIndicator

        if (direction === 'right') {
            this.positionLeftItem++
                const max = this.sliderItemPosition.getMaxPosition()
            if ((this.positionLeftItem + this.sliderWrapperWidth / this.sliderItemWidth - 1) > max) {
                const nextItem = this.sliderItemPosition.getItemWithMinPosition()
                nextItem.position = max + 1
                nextItem.transform += this.items.length * 100
                nextItem.item.style.transform = 'translateX(' + nextItem.transform + '%)'
            }
            this.transformValue -= this.transformStep

            if (this.sliderIndicator) {

                this.indexIndicator = this.indexIndicator + 1
                if (this.indexIndicator > this.maxIndexIndicator) {
                    this.indexIndicator = 0;
                }
            }
        }
        if (direction === 'left') {
            this.positionLeftItem--
                const min = this.sliderItemPosition.getMinPosition()
            if (this.positionLeftItem < min) {
                const nextItem = this.sliderItemPosition.getItemWithMaxPosition()
                nextItem.position = min - 1
                nextItem.transform -= this.items.length * 100
                nextItem.item.style.transform = 'translateX(' + nextItem.transform + '%)'
            }
            this.transformValue += this.transformStep

            if (this.sliderIndicator) {
                this.indexIndicator = this.indexIndicator - 1
                if (this.indexIndicator < 0) {
                    this.indexIndicator = this.maxIndexIndicator
                }
            }
        }
        this.sliderWrapper.style.transform = 'translateX(' + this.transformValue + '%)'

        if (this.sliderIndicator) {
            this.indicatorItems[currentIndicator].classList.remove('active')
            this.indicatorItems[this.indexIndicator].classList.add('active')
        }

    }


    controlClick(event) {
        if (event.target.classList.contains('slider__control')) {
            event.preventDefault()
            const direction = event.target.classList.contains('slider__control_right') ? 'right' : 'left'
            this.transform(direction)
        }
    }
}

const _getSliderControls = () => `
<a class="slider__control slider__control_left slider__control_show" href="" role="button">&lt</a>
<a class="slider__control slider__control_right slider__control_show" href="" role="button">&gt</a>`

const _slideTo = (to, context) => {
    let i = 0
    const direction = (to > context.indexIndicator) ? 'right' : 'left'
    while (to !== context.indexIndicator && i <= context.maxIndexIndicator) {
        context.transform(direction)
        i++
    }
}



const _createIndicators = (amount, context) => {
    const sliderIndicators = document.createElement('ol')
    sliderIndicators.classList.add('slider__indicators')

    for (let i = 0; i < amount; i++) {
        const sliderIndicatorsItem = document.createElement('li')
        if (i === 0) {
            sliderIndicatorsItem.classList.add('active')
        }
        sliderIndicatorsItem.dataset.slideTo = i
        sliderIndicators.insertAdjacentElement('beforeend', sliderIndicatorsItem)

        context.indicatorItems.push(sliderIndicatorsItem)

    }

    return sliderIndicators

}