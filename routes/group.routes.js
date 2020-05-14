const { Router } = require('express')
const $ = require('../initData.js')

const router = new Router

// const groups = ['All Contacts', 'Family', 'Friends', 'Co-Workers']

// const groups = [
//     { id: 1, name: 'All Contacts', type: 'system' },
//     { id: 2, name: 'Family', type: 'system' },
//     { id: 3, name: 'Friends', type: 'system' },
//     { id: 4, name: 'Co-Workers', type: 'system' }
// ]

const groups = $.groups

router.get('/', (req, res) => {
    res.json({ data: groups })
})

router.post('/', (req, res) => {
    const { reqType, value, groupId } = req.body

    console.log('Type req: ', reqType)
    console.log('Value req: ', value)

    if (reqType === 'new') {

        const $group = { id: randomId(5, 100000), name: value, type: 'user' }

        const r = groups.filter(group => group.name.includes(value))
        console.log('r: ', r.length)
        console.log('All groups: ', groups)

        const doubleGroup = groups.find(group => group.name === value)
        if (doubleGroup) {
            const repeatGroups = groups.filter(group => group.name.includes(value))
            $group.name = `${value}-${repeatGroups.length}`
        }
        groups.push($group)
        res.json({ message: 'Groups has been created...', group: $group })

    } else {
        console.log('Group id: ', groupId)
        const $group = groups.find(group => group.id === groupId)

        const doubleGroup = groups.find(group => group.name === value)
        if (doubleGroup) {

            if (doubleGroup.id !== groupId) {
                const repeatGroups = groups.filter(group => group.name.includes(value))
                $group.name = `${value}-${repeatGroups.length}`
            }

        } else {
            $group.name = value
        }

        console.log('Needed group: ', $group)
        console.log('Groups: ', groups)

        res.json({ message: 'Groups has been update...', group: $group })
    }
})

router.delete('/', (req, res) => {
    const { groupId } = req.body
    console.log('Nedded id: ', groupId)
    console.log('All group: ', groups)
    groups.forEach((group, index) => {
        if (group.id === groupId) {
            groups.splice(index, 1)

            const needCards = $.cards.filter(card => card.groups.includes(groupId))
            console.log('Card with need id: ', needCard)
            const indexR = needCards.map(card => card.groups.findIndex(g => g === groupId))
            console.log('Need id: ', indexR)

            // а также удалить у карточки 
        }
    })
    console.log('All group without 1 group: ', groups)

})



const randomId = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


module.exports = router