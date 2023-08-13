const sc = require('../config/session.js')


exports.getLogout = async(req, res, next) =>{
  sc.sess=req.session.destroy()
	res.redirect('/')
}