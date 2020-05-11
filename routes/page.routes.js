const { Router } = require('express')
const path = require('path')

const router = Router()

router.get('/', (req, res) => {
  // process.cwd() -- полный путь до папки из кторой запушен сервер
  res.sendFile(path.join(process.cwd(), 'client/dist/index.html'))
})

module.exports = router;