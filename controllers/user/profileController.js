const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, order, order_item, paket, paket_image, jadwal_menu } = require('../../models')
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

exports.getProfile = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){    
    sc.sess.home = '/'
    res.render('user/profile', { 
      title: 'Profile',
      session: sc.sess,
      moment: moment,
      // data_company: data_company
    });
	}else{
		res.redirect('/login')
	}
}

exports.getFavorite = async(req, res, next) =>{
    sc.sess=req.session
    if(!(sc.sess.lng)){
      sc.sess.lng = 'en'
    }
    req.setLocale(sc.sess.lng)
    if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){  
      
      const data_paket = await paket.findAll({
        raw: true,
        // attributes: ['id','status', 'name', 'rate,', 'keterangan', 'type'],
        where: { 
          status: {[Op.ne]: 0} ,
          type: 'Premium'
        },
        order: [
          ['name', 'ASC']
        ]
      })
      const updateDataPaket = data_paket.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));

      sc.sess.home = '/'
      res.render('user/favorite', { 
        title: 'Favorite',
        session: sc.sess,
        moment: moment,
        data_paket: updateDataPaket
        // data_company: data_company
      });
      }else{
          res.redirect('/login')
      }
  }