const { Router } = require('express')
const multer = require('multer') //для анализа multipart / form data
const path = require('path')
const $ = require('../initData.js')

const router = new Router

const storage = multer.diskStorage({
  // destination	Каталог, где будет сохранен файл
  destination: function(req, file, cb) {
    cb(null, 'client/dist/logo')
  },
  // filename	Имя файла без destination
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${file.originalname}`)
  }
})


const upload = multer({
  storage: storage,
})

let cards = $.cards
const groups = $.groups

router.post('/card', (req, res) => {
  const $card = cards.find(card => card.id === req.body.id)
  res.json({ data: $card })
})

router.get('/:gpId', (req, res) => {
  const $cards = cards.filter(card => card.groups.find(gr => gr === +req.params.gpId))
  res.json({ data: $cards })
})

router.get('/', (req, res) => {
   res.json({ data: cards })
})


//добавляет новый номер в карточку позже нужно будет сделать универсальный метод для изменения карточки
router.put('/', (req, res) => {
  const { id, data } = req.body
  const card = cards.find(card => card.id.toString() === id.toString())
  card.numbers.push({
    type: data.type,
    number: data.number
  })

  res.json({ message: 'Ok' })
})


//создание новой картчоки
router.post('/', upload.single('logo'), (req, res) => {
  const { firstName, lastName, groups = ['All Contacts'], info = '', mobile, home = '', work = '' } = req.body
  const groupIdArray = getGroupId(groups.split(','))
  const nextId = getCardMaxId() + 1
  console.log('nextId: ', nextId)
  const newCard = {
    id: nextId,
    img: 'no-photo.png',
    firstName,
    lastName,
    info,
    numbers: [
      { type: 'mobile', number: mobile },
      { type: 'work', number: work },
      { type: 'home', number: home }
    ],
    groups: groupIdArray
  }

  if (req.file) {
    newCard.img = req.file.filename
  }
  cards.push(newCard)
  res.json({ card: newCard })
})


router.post('/logo', upload.single('logo'), (req, res) => {
  if (req.file) {
    const logo = req.file.filename
    return res.json( { logo })
  }
  res.status(400)
})


router.patch('/', upload.single('logo'), (req, res) => {
  const {id, firstName, lastName, groups = ['All Contacts'], info = '', ...numbers } = req.body
  const groupIdArray = getGroupId(groups.split(','))
  const updatableCard = cards.find(card => card.id.toString() === id.toString())

  const updateNumbers = Object.keys(numbers).map( numberKey => {
    return { type: `${numberKey}`, number: numbers[numberKey] }
  })

  const updatedCard  = {
    firstName,
    lastName,
    info,
    numbers: updateNumbers,
    groups: groupIdArray
  }

  if (req.file) { updatedCard.img = req.file.filename }

  Object.keys(updatableCard).forEach( cardElemKey => {
    if(updatedCard[cardElemKey]) {
      updatableCard[cardElemKey] = updatedCard[cardElemKey]
    }
  })

  res.json({ card: updatableCard })
})

router.delete('/', (req, res) => {
  const { id } = req.body
  const deletedCard = cards.find( card => card.id === id)
  cards = cards.filter( card => card.id !== id)
  res.json({ message: 'Card has been deleted...', card: deletedCard })
})



const getGroupId = groupName => groupName.map( group => groups.find( $group => $group.name.trim() === group.trim()).id)
const getCardMaxId = () => (cards.length
    ? cards.reduce( (ac, card) => ac.id > card.id ? ac : card ).id
    : 0)




module.exports = router