const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoiceController.js')

router.get('/:item', invoiceController.getInvoice)

module.exports = router