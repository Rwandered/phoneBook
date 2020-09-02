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


const cards = $.cards

router.post('/card', (req, res) => {
  console.log('Body : ', req.body.id)
  const $card = cards.find(card => card.id === req.body.id)
  // console.log('NEED CARDS', $card)
  res.json({ data: $card })
})

router.get('/:gpId', (req, res) => {
  // console.log('Group name: ', req.params.gpName)
  const $cards = cards.filter(card => card.groups.find(gr => gr === +req.params.gpId))
  console.log('NEED CARDS', $cards)
  res.json({ data: $cards })
})

router.get('/', (req, res) => {
  // console.log('All card')
  res.json({ data: cards })
})


//добавляет новый номер в карточку позже нужно будет сделать универсальный метод для изменения карточки
router.put('/', (req, res) => {
  const { id, data } = req.body
  console.log('ID: ', id)
  console.log('Data: ', data)
  const card = cards.find(card => card.id === id)

  console.log(card.number)
  card.numbers.push({
    type: data.type,
    number: data.number
  })
  console.log(cards)
  res.json({ message: 'Ok' })
})

//создание новой картчоки

router.post('/', upload.single('logo'), (req, res) => {
  console.log('Req body: ',req.body)
  const { firstName, lastName, group = 'All Contacts', info = '', mobile, home = '', work = '' } = req.body
  const groupIdArray = getGroupId(group)
  const nextId = getCardMaxId() + 1

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
  console.log('Logo: ', req.file)
  if (req.file) {
    const logo = req.file.filename
    return res.json( { logo })
  }
  res.status(400)
})

const getGroupId = groupName => groupName.map( group => $.groups.find( $group => $group.name === group).id)
const getCardMaxId = () => $.cards.reduce( (ac, card) => ac.id > card.id ? ac : card ).id




module.exports = router