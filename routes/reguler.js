const express = require('express')
const router = express.Router()
const regulerController = require('../controllers/regulerController.js')

router.get('/', regulerController.getReguler)
router.get('/listMenuDay', regulerController.listMenuDay)

module.exports = router