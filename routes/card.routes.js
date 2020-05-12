const { Router } = require('express')
const multer = require('multer') //для анализа multipart / form data
const path = require('path')

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


const cards = [
    { id: '1', img: 'u-logo.png', firstName: 'Kyle', lastName: 'Simpson', info: 'Austin, TX Getify Solutions', numbers: [{ type: 'mobile', number: '+49 176 458 4587' }, { type: 'work', number: '+49 176 458 4587' }, { type: 'home', number: '+49 176 458 4587' }], group: 2 },
    { id: '2', img: 'u-logo.png', firstName: 'Roman', lastName: ' Zobnin', info: 'Google, Full stack JS Dev DevOps', numbers: [{ type: 'mobile', number: '+89 543 458 4581' }, { type: 'work', number: '+89 543 458 4581' }, { type: 'home', number: '+89 543 458 4581' }], group: 3 },
    { id: '3', img: 'u-logo.png', firstName: 'John', lastName: ' Smith', info: 'Austin, TX Getify Solutions', numbers: [{ type: 'mobile', number: '+996 946 01 16' }, { type: 'work', number: '+996 946 01 16' }, { type: 'home', number: '+996 946 01 16' }], group: 4 },
]

router.post('/card', (req, res) => {
    console.log('Body : ', req.body.id)
    const $card = cards.find(card => card.id === req.body.id)
        // console.log('NEED CARDS', $card)
    res.json({ data: $card })
})

router.get('/:gpId', (req, res) => {
    // console.log('Group name: ', req.params.gpName)
    const $cards = cards.filter(card => card.group === +req.params.gpId)
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

    const { firstName, lastName, group = 'No group', info = '', mobile, home = '', work = '' } = req.body
    const newCard = {
        id: 4,
        img: 'no-photo.png',
        firstName,
        lastName,
        info,
        numbers: [
            { type: 'mobile', number: mobile },
            { type: 'work', number: work },
            { type: 'home', number: home }
        ],
        group
    }
    if (req.file) {
        newCard.img = req.file.filename
    }
    cards.push(newCard)
    res.json({ card: newCard })
})




module.exports = router