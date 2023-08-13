const express = require('express')
const router = express.Router()
const payController = require('../controllers/payController.js')

router.get('/', payController.getPay)
router.post('/confirmPay', payController.confirmPay)
router.post('/snapPay', payController.snapPay)

module.exports = router