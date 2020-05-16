const path = require('path')
const config = require('config') //этот пакет позволяет вынести некоторые константы в отдельный файл default.json в папке config проекта и удобно с ними работать
const express = require('express')
const bodyParser = require('body-parser') // нужет чотбы обрабатывать form data с клиента


const PORT = config.get('port') || 5000
const test = [1, 2, 3]

const app = express()

app.use(express.json({ extended: true })) //чтобы express мог работать с json по умолчанию он не может 

// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// далее так как мы будем возвращать файлы с html разметкой то нужно указать путь до папки со статическими файлами
app.use(express.static(path.join(__dirname, 'client', 'dist')))
app.use(express.static(path.join(__dirname, 'client/dist/logo')))

// это ммиддлваре обработчик - предварительный обработчик запроса
app.use('/', require('./routes/page.routes'))

app.use('/group', require('./routes/group.routes'))

app.use('/card', require('./routes/card.routes'))


app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});