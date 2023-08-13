const express = require('express')
const router = express.Router()
const languageController = require('../controllers/languageController.js')

router.post('/setLng', languageController.setLng)

module.exports = router
