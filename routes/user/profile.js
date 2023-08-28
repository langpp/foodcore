const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/user/profileController.js')

router.get('/', profileController.getProfile)
router.post('/change', profileController.changeProfile)
router.get('/favorite', profileController.getFavorite)


module.exports = router