const express = require('express')
const router = express.Router()
const saranController = require('../controllers/saranController.js')


router.get('/', saranController.getSaran)
router.post('/postSaran', saranController.postSaran)

module.exports = router