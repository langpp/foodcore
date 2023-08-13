const express = require('express')
const router = express.Router()
const cpController = require('../controllers/cpController.js')

router.get('/:item', cpController.singleCp)
router.post('/', cpController.postCp)

module.exports = router