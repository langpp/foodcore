const sc = require('../config/session.js')
const link = require('../config/link.js')

exports.getDashboard = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.username){
		res.render('dashboard', { 
      title: 'Dashboard',
      session: sc.sess
    });
	}else{
		res.redirect('login')
	}
}