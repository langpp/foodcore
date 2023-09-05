const express = require('express')
const router = express.Router()
const premiumController = require('../controllers/premiumController.js')

router.get('/', premiumController.getPremium)
router.get('/:kategori', premiumController.getPremium)

module.exports = router