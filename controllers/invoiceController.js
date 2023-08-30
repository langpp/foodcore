const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.getInvoice = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(req.params.item){
    let id = req.params.item
    const data_jadwal_menu = await jadwal_menu.findOne({
      raw: true,
      attributes: [
        'id', 'date', 'total', 'qty',
        [sequelize.col('company.name'), 'company'],
        [sequelize.col('company.kode'), 'kode'],
        [sequelize.col('paket.id'), 'paket_id'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.col('paket.keterangan'), 'keterangan'],
        [sequelize.col('paket.image1'), 'image1'],
        [sequelize.col('paket.image2'), 'image2'],
      ],
      // limit: 7,
      where: { 
        id
      },
      include: [
        { 
          model: company, 
          as: 'company',
          attributes: []
        },
        { 
          model: paket, 
          as: 'paket',
          attributes: [],
        }
      ]
    })
    if(data_jadwal_menu){
      res.render('invoice', { 
        title: 'Invoice',
        session: sc.sess,
        moment: moment,
        data_jadwal_menu: data_jadwal_menu,
        id: id,
        thousandSeparator: thousandSeparator
        // data_image: data_image
      });
    }else{
      res.render("404.ejs");
    }
  }else{
    res.render("404.ejs");
  }

  
}

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