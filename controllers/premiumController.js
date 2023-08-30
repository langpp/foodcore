const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')

function thousandSeparator(value){
  const options = { 
    // style: 'currency', 
    // currency: 'IDR', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formattedNumber = value.toLocaleString('de-DE', options);
  return formattedNumber;
}

exports.getPremium = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){    
    // if(sc.sess.userType == 7){
      if(req.params.kategori == 'lokal' || req.params.kategori == 'asian' || req.params.kategori == 'western'){
        var where = { 
          status: {[Op.ne]: 0} ,
          type: 'Premium',
          kategori: req.params.kategori.toUpperCase(),
        }
        var kat = req.params.kategori.toUpperCase()
      }else{
        var where = { 
          status: {[Op.ne]: 0} ,
          type: 'Premium',
        }
        var kat = ""
      }
      const data_paket = await paket.findAll({
        raw: true,
        // attributes: ['id','status', 'name', 'rate,', 'keterangan', 'type'],
        where: where,
        order: [
          ['name', 'ASC']
        ]
      })
      const updateDataPaket = data_paket.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));
      // console.log(paket)

      res.render('premium', { 
        title: 'Premium',
        session: sc.sess,
        kategori: kat,
        data_paket: updateDataPaket
      });
    // }else{
    //   res.render('comingsoon', { 
    //     title: 'Coming Soon',
    //     session: sc.sess
    //   });
    // }
	}else{
		res.redirect('/login')
	}
  
}