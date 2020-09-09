import { PORT, ADDRESS } from "../constants/constants"

export const setCard = async options => {
  try {

    const response = await fetch(`http${ADDRESS}${PORT}/card`, {
      method: 'POST',
      body: options
    })
    return await response.json()
  } catch (e) {}
}

export const updateCard = async options => {
  console.log('updateCard data: ', options)
  try {

    const response = await fetch(`http${ADDRESS}${PORT}/card`, {
      method: 'PATCH',
      body: options
    })
    return await response.json()
  } catch (e) {}
}

export const getGroupsValueById = async (payload) => {
  try {
    const response = await fetch(`http${ADDRESS}${PORT}/group/id`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return await response.json()
  } catch (e) {}
}



export const getCards = async() => {
  try {
    return await (await fetch(`http${ADDRESS}${PORT}/card`)).json()
  } catch (e) {}
}

export const getCardById = async id => {
  try {
    return await (await fetch(`http${ADDRESS}${PORT}/card/card`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ id })
    })).json()
  } catch (e) {}
}

export const getCardByGroup = async group => {
  try {
    return await (await fetch(`http${ADDRESS}${PORT}/card/${group}`)).json()
  } catch (e) {}
}

export const setCardLogo = async options => {
  try {
    const response = await fetch(`http${ADDRESS}${PORT}/card/logo`, {
      method: 'POST',
      body: options
    })

    return response.json()
  } catch (e) {}
}

export const getGroups = async() => {
  try {
    return await (await fetch(`http${ADDRESS}${PORT}/group`)).json()
  } catch (e) {}
}

export const setGroup = async options => {
  try {
    const response = await fetch(`http${ADDRESS}${PORT}/group`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(options)
    })

    return response.json()
  } catch (e) {}
}


export const deleteGroup = async groupId => {
  try {
    const response = await fetch(`http${ADDRESS}${PORT}/group`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ groupId })
    })
  } catch (e) {}
}


export const addPhone = async options => {
  try {
    const response = await fetch(`http${ADDRESS}${PORT}/card`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(options)
    })
  } catch (e) {}
}