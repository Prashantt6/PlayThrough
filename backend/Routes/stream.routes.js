const {validateStreamUrl, streamVideo} = require('../controllers/stream.controller')

const router = require('express').Router()

router.post('/validate', validateStreamUrl)
router.get('/stream', streamVideo)

module.exports = router