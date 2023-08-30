const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController.js')

router.get('/', likeController.listLike)
router.post('/change', likeController.changeLike)

module.exports = router