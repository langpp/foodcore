const sc = require('../config/session.js')
const link = require('../config/link.js')

exports.getAbout = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  res.render('about', { 
    title: 'About',
    session: sc.sess
  });
}