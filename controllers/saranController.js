const sc = require('../config/session.js')
const link = require('../config/link.js')
const { sequelize, saran } = require('../models')

exports.getSaran = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  // console.log(sc.sess.email)
  if(sc.sess.phone){
    res.render('saran', { 
      title: 'Saran',
      session: sc.sess
    });
  }else{
    res.redirect('/login')
  }
}

exports.postSaran = async(req, res, next) =>{
  sc.sess=req.session
  if(sc.sess.phone){
    const name = req.body.name
    const saran_web = req.body.saran
    const sumber = sc.sess.phone
    if(sc.sess.lng && name.trim() !== '' && saran_web.trim() !== ''){
      try{
        dataSaran= {
          name: name,
          saran: saran_web,
          sumber
        }
        await saran.create(dataSaran)
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Access Failed' })
    }
  }else{
    res.redirect('/login')
  }	
}