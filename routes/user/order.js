const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/user/orderController.js')

router.get('/', orderController.getOrder)
router.get('/listOrder', orderController.listOrder)
router.get('/detailOrder', orderController.detailOrder)
router.get('/checkOrder', orderController.checkOrder)


module.exports = router