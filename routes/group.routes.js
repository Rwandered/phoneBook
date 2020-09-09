const { Router } = require('express')
const $ = require('../initData.js')

const router = new Router

const groups = $.groups
const randomId = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getGroupsValuesById = (ids) => {
  console.log('ids: ', ids)
  // const optionId = ids.split(',').map(e => +e)
  // return groups.reduce( (acc, group) => {
  //   optionId.includes(group.id)
  //     ? acc = [...acc, group.name]
  //     : acc
  // }, [])
}

router.get('/', (req, res) => {
  res.json({ data: groups })
})

router.post('/', (req, res) => {
  const { reqType, value, groupId } = req.body

  if (reqType === 'new') {

    const $group = { id: randomId(5, 100000), name: value, type: 'user' }

    const doubleGroup = groups.find(group => group.name === value)
    if (doubleGroup) {
      const repeatGroups = groups.filter(group => group.name.includes(value))
      $group.name = `${value}-${repeatGroups.length}`
    }
    groups.push($group)
    res.json({ message: 'Groups has been created...', group: $group })

  } else {

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

    res.json({ message: 'Groups has been update...', group: $group })
  }
})

router.delete('/', (req, res) => {
  const { groupId } = req.body
  groups.forEach((group, index) => {
    if (group.id === groupId) {
      groups.splice(index, 1) // delete group from group array

      $.cards.forEach((card, index) => {

        const cardGroups = card.groups
        const $index = cardGroups.findIndex(gr => gr === groupId)

        if ($index !== -1) {
          $.cards[index].groups.splice($index, 1)
        }
      })
    }
  })
  res.json({ message: 'Group has been deleted...' })
})

router.post('/ids', (req, res) => {
  console.log('ids Body :', req.body)
  res.json({ data: getGroupsValuesById(req.body.ids) })
})


module.exports = router