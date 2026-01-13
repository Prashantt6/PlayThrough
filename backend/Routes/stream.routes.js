const validateStreamUrl = require('../controllers/stream.controller')

const router = require('express').Router()

router.post('/validate', validateStreamUrl)

module.exports = router