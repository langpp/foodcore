const express = require('express')
const router = express.Router()
const xenditController = require('../controllers/xenditController.js')


router.get('/', xenditController.getIndex)

module.exports = router