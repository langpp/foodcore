const express = require('express')
const router = express.Router()
const premiumController = require('../controllers/premiumController.js')

router.get('/', premiumController.getPremium)

module.exports = router