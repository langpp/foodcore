const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket_like } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')

exports.listLike = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){
    const user_id = sc.sess.user_id
    const data_like = await paket_like.findAll({
      raw: true,
      attributes: ['id','paket_id'],
      where: { user_id: user_id },
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_like})
	}else{
		res.redirect('/login')
	}
}

exports.changeLike = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){
    const user_id = sc.sess.user_id
    const typeparam = req.body.typeParam
    const paket_id = req.body.paket_id
    
    if(typeparam == 'like'){
      dataLike= {
        user_id: user_id,
        paket_id: paket_id,
      }
      await paket_like.create(dataLike)
    }else{
      await paket_like.destroy({
          where: {
            paket_id: paket_id,
            user_id: user_id,
          }
      })
    }
    return res.status(200).json({ status: 200, response: 'Successful'})
	}else{
		res.redirect('/login')
	}
}
