const express = require('express')
const router = express.Router()

const home = require('./home')
const login = require('./login')
const logout = require('./logout')
const language = require('./language')
const saran = require('./saran')
const about = require('./about')
const cp = require('./cp')
const reguler = require('./reguler')
const premium = require('./premium')
const pay = require('./pay')
const daymenu = require('./daymenu')
const dashboard = require('./dashboard')
const comingsoon = require('./comingsoon')
const invoice = require('./invoice')

const admin_client = require('./admin/client')
const admin_paket = require('./admin/paket')
const admin_jadwal = require('./admin/jadwal')
const admin_user = require('./admin/user')


const user_order = require('./user/order')



router.use('/', home)
router.use('/login', login)
router.use('/logout', logout)
router.use('/language', language)
router.use('/saran', saran)
router.use('/about', about)
router.use('/cp', cp)
router.use('/reguler', reguler)
router.use('/premium', premium)
router.use('/pay', pay)
router.use('/daymenu', daymenu)
router.use('/dashboard', dashboard)
router.use('/comingsoon', comingsoon)
router.use('/invoice', invoice)

router.use('/admin/client', admin_client)
router.use('/admin/paket', admin_paket)
router.use('/admin/jadwal', admin_jadwal)
router.use('/admin/user', admin_user)

router.use('/user/order', user_order)

module.exports = router