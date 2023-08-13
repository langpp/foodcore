const express = require('express')
const router = express.Router()
const clientController = require('../../controllers/admin/clientController.js')

router.get('/', clientController.getClient)
router.get('/listClient', clientController.listClient)
router.post('/postClient', clientController.postClient)
router.put('/putClient', clientController.putClient)
router.delete('/deleteClient', clientController.deleteClient)

module.exports = router