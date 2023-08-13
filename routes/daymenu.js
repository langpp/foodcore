const express = require('express')
const router = express.Router()
const daymenuController = require('../controllers/daymenuController.js')

router.get('/:item', daymenuController.singleDay)
// router.post('/', daymenuController.postCp)

module.exports = router