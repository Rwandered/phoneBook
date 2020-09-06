import toUpperFistLetter from "../Text/text";
import {getArrayParts, getArrayWithObjectKeys, getObjectFromArray} from "../WithObject/withObject";
import {dictionary} from "../Dictionary/dictionary";

const getPhoneSlide = (data) => {
  return data.map( item => {
    return `
      <div class="phone__column ">
        <label for="${item[0]}">${toUpperFistLetter(item[0])}</label>
        <input class="phone__txt_field" value="${item[1]}" type="text" name="${item[0]}">
      </div>
    `
  }).join('')
}

const getMainSlide = (params) => {
  const mainKeys = { firstName: '', lastName: '', group: '', info: '', }

  if(params) {
    for(let mainKey in mainKeys) {
      for(let key in params) {
        mainKeys[mainKey] = params[mainKey]
      }
    }
  }

  return getArrayWithObjectKeys(mainKeys)
    .map( param => {
      return `
           <div class="phone__column">
            <label for="${param[0][0]}">${dictionary[ param[0][0]] }</label>
            ${
        param[0][0] === 'group'
          ? `<div id="select"></div>`
          : ` <input class="phone__txt_field" value="${param[0][1]}" type="text" name="${param[0][0]}" required>`
      }         
          </div>
          `
    })
    .join('')
}

const getAnotherSliders = (params) => {
  const countSliders = getCountAnotherSlides(params) // 1 or numbers.length
  let mainKeys = { mobile: '', home: '', work: '',}
  const anotherSliders = []

  if(params) {
    const numbers = getObjectFromArray(params.numbers)
    mainKeys  = {...mainKeys, ...numbers}
  }
  const arrayParts = getArrayParts( Object.entries(mainKeys) )

  for(let i = 0; i < countSliders; i++) {
    const slide = getPhoneSlide( arrayParts[i] )
    anotherSliders.push(slide)
  }

  return anotherSliders
}

const getCountAnotherSlides = (params) => params  ? Math.ceil(params.numbers.length / 4) : 1


export const _getSliderItems = (params) => {

  const mainSlide = getMainSlide(params) // один слайд
  const anotherSlides = getAnotherSliders(params)

  return [mainSlide, ...anotherSlides]
}