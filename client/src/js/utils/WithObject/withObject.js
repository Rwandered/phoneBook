export const getObjectFromArray = (array) => {
  return array.reduce( (acc, item) => {
    acc[item.type] = item.number
    return acc
  }, {})
}

export const getArrayWithObjectKeys = (object) => {
  return Object.keys(object).map( key => {
    return Object.entries({
      [key]: object[key]
    })
  })
}

export const getArrayParts = (array) => {

  return array.reduce( (acc, entry) => {

    if(acc[acc.length-1].length === 4){
      acc.push([]);
    }

    acc[acc.length-1].push(entry);
    return acc;
  }, [[]])
}