const express = require('express')
const router = express.Router()
const userController = require('../../controllers/admin/userController.js')

router.get('/', userController.getUser)
router.get('/listUser', userController.listUser)
router.post('/postUser', userController.postUser)
router.put('/putUser', userController.putUser)
router.delete('/deleteUser', userController.deleteUser)
router.post('/importUser',  userController.uploadFile, userController.importUser)
router.get('/jumlahKaryawan',  userController.jumlahKaryawan)

module.exports = router