const express = require('express')
const router = express.Router()
const paketController = require('../../controllers/admin/paketController.js')

router.get('/', paketController.getPaket)
router.get('/listPaket', paketController.listPaket)
router.post('/postPaket', paketController.postPaket)
router.put('/putPaket', paketController.putPaket)
router.delete('/deletePaket', paketController.deletePaket)

module.exports = router