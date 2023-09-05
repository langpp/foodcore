const sc = require('../config/session.js')
const link = require('../config/link.js')
const moment = require('moment-timezone')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')

exports.getHome = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  // console.log(sc.sess.email)
  sc.sess.home = '/'  

  const data_paket = await paket.findAll({
    raw: true,
    attributes: [
      'id', 'name', 'keterangan', 'image1', 'image2'
    ],
    where: { status: {[Op.ne]: 0}, type: 'Reguler' },
  })

  const data_paket_lokal = await paket.findAll({
    raw: true,
    attributes: [
      'id', 'name', 'keterangan', 'image1', 'image2', 'rate', 'keterangan'
    ],
    where: { status: {[Op.ne]: 0}, type: 'Premium', kategori: 'Lokal' },
  })

  const data_paket_asian = await paket.findAll({
    raw: true,
    attributes: [
      'id', 'name', 'keterangan', 'image1', 'image2', 'rate', 'keterangan'
    ],
    where: { status: {[Op.ne]: 0}, type: 'Premium', kategori: 'Asian' },
  })

  const data_paket_western = await paket.findAll({
    raw: true,
    attributes: [
      'id', 'name', 'keterangan', 'image1', 'image2', 'rate', 'keterangan'
    ],
    where: { status: {[Op.ne]: 0}, type: 'Premium', kategori: 'Western' },
  })

  const updateDataPaket1 = data_paket_lokal.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));
  const updateDataPaket2 = data_paket_asian.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));
  const updateDataPaket3 = data_paket_western.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));
  // const data_image = await paket.findAll({
  //   raw: true,
  //   attributes: [
  //     'id',
  //     [sequelize.col('image.image'), 'image'],
  //   ],
  //   include: [
  //     { 
  //       model: paket_image, 
  //       as: 'image',
  //       attributes: []
  //     },
  //   ]
  // })

  res.render('home', { 
    title: 'Home',
    session: sc.sess,
    moment: moment,
    data_jadwal_menu: data_paket,
    data_jadwal_lokal: updateDataPaket1,
    data_jadwal_asian: updateDataPaket2,
    data_jadwal_western: updateDataPaket3,
    // data_image: data_image
  });
	// if(sc.sess.username){
	// 	req.setLocale(sc.sess.lng)
  //   res.render('index', { 
  //     title: 'Beranda',
  //     link_geoserver: sc.sess.url+link.geoserver,
  //     urlEpcs: link.urlEpcs,
  //     username: sc.sess.username,
  //     userAccess: sc.sess.userAccess,
  //     OCCODE: sc.sess.OCCODE,
  //     link_ms4w: sc.sess.url+link.ms4w,
  //   });
	// }else{
	// 	res.redirect('/login');
	// }
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