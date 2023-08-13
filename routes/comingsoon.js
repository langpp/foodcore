const express = require('express')
const router = express.Router()
const comingsoonController = require('../controllers/comingsoonController.js')

router.get('/', comingsoonController.getComingSoon)

module.exports = router