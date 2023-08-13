const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController.js')


router.get('/', loginController.getLogin)
router.post('/', loginController.postLogin)
router.post('/checkPhone', loginController.checkPhone)
router.post('/loginPassword', loginController.loginPassword)

module.exports = router