import { PORT, ADDRESS } from "../constants/constants"

export const getGroups = async() => {
    try {
        return await (await fetch(`http${ADDRESS}${PORT}/group`)).json()
    } catch (e) {}
}

export const setCard = async options => {
    try {

        console.log('Set card:', options)
        const response = await fetch(`http${ADDRESS}${PORT}/card`, {
            method: 'POST',
            body: options
        })
        return response.json()
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