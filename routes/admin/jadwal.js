const express = require('express')
const router = express.Router()
const jadwalController = require('../../controllers/admin/jadwalController.js')

router.get('/', jadwalController.getJadwal)
router.get('/listJadwal', jadwalController.listJadwal)
router.get('/listJadwalexcel', jadwalController.listJadwalexcel)
router.get('/delete-expired', jadwalController.deleteExpired)
router.get('/detail/:id', jadwalController.getJadwalDetail)
router.get('/detail/get/:id', jadwalController.getJadwalDetailApi)
router.get('/detail/sum/:id', jadwalController.getJadwalSumApi)
router.get('/:item', jadwalController.getJadwalCp)
router.post('/postJadwal', jadwalController.postJadwal)
router.put('/putJadwal', jadwalController.putJadwal)
router.put('/changeStatus', jadwalController.changeStatus)
router.delete('/deleteJadwal', jadwalController.deleteJadwal)

module.exports = router