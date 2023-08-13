const sc = require('../config/session.js')
const link = require('../config/link.js')


exports.getComingSoon = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){    
    res.render('comingsoon', { 
      title: 'Coming Soon',
      session: sc.sess
    });
	}else{
		res.redirect('/login')
	}
  
}