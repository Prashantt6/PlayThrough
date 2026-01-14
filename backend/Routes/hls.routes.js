const { startHLS } = require('../controllers/hls.controller')

const router = require('express').Router()

router.post('/hls', startHLS)

module.exports = router