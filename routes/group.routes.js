const { Router } = require('express')

const router = new Router

// const groups = ['All Contacts', 'Family', 'Friends', 'Co-Workers']

const groups = [
    { id: 1, name: 'All Contacts', type: 'system' },
    { id: 2, name: 'Family', type: 'system' },
    { id: 3, name: 'Friends', type: 'system' },
    { id: 4, name: 'Co-Workers', type: 'system' }
]

router.get('/', (req, res) => {
    res.json({ data: groups })
})

router.post('/', (req, res) => {
    const { group } = req.body
    const $group = { id: randomId(5, 100000), name: group, type: 'user' }
    groups.push($group)
    res.json({ message: 'OK', group: $group })
})



const randomId = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


module.exports = router