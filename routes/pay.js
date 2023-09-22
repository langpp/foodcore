const express = require('express')
const router = express.Router()
const payController = require('../controllers/payController.js')

router.get('/', payController.getPay)
router.get('/finish', payController.getPayFinish)
router.get('/unfinish', payController.getPayUnfinish)
router.post('/confirmPay', payController.confirmPay)
router.post('/snapPay', payController.snapPay)
router.get('/changeStatus', payController.changeStatus)
router.post('/notification', payController.notification)

module.exports = router