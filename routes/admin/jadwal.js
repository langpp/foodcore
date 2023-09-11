const express = require('express')
const router = express.Router()
const jadwalController = require('../../controllers/admin/jadwalController.js')

router.get('/', jadwalController.getJadwal)
router.get('/listJadwal', jadwalController.listJadwal)
router.get('/listJadwalexcel', jadwalController.listJadwalexcel)
router.get('/:item', jadwalController.getJadwalCp)
router.post('/postJadwal', jadwalController.postJadwal)
router.put('/putJadwal', jadwalController.putJadwal)
router.delete('/deleteJadwal', jadwalController.deleteJadwal)
router.put('/changeStatus', jadwalController.changeStatus)
router.get('/detail/:id', jadwalController.getJadwalDetail)
router.get('/detail/get/:id', jadwalController.getJadwalDetailApi)

module.exports = router