const sc = require('../config/session.js')

exports.setLng = async(req, res, next) =>{
  sc.sess = req.session
  sc.sess.lng = req.body.lng
  return res.status(200).json({ status: 200, response: 'Successful' })
}