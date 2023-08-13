const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.singleCp = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(req.params.item){
    let kode = req.params.item
    const data_jadwal_menu = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'date',
        [sequelize.col('company.name'), 'company'],
        [sequelize.col('paket.id'), 'paket_id'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.col('paket.keterangan'), 'keterangan'],
        [sequelize.col('paket.image1'), 'image1'],
        [sequelize.col('paket.image2'), 'image2'],
      ],
      limit: 7,
      where: { 
        status: {[Op.ne]: 0},
        '$company.kode$': kode,
        '$company.status$': {[Op.ne]: 0},
        date: {
          [Op.gte]: new Date()
        }
      },
      group: 'date',
      order: [
        ['date', 'ASC'],
      ],
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
    // console.log(data_jadwal_menu[0])
    if(data_jadwal_menu){
      sc.sess.home = '/cp/'+req.params.item
      res.render('cp', { 
        title: 'Company',
        session: sc.sess,
        moment: moment,
        data_jadwal_menu: data_jadwal_menu,
        kode: kode
        // data_image: data_image
      });
    }else{
      res.render("404.ejs");
    }
  }else{
    res.render("404.ejs");
  }

  
}

exports.postCp = async(req, res, next) =>{
  sc.sess=req.session
  const paket_id = req.body.paket_id
	try{
		const data_paket = await paket.findOne({
      raw: true,
      attributes: [
        'id', 'name', 'keterangan'
      ],
      where: { id: paket_id },
    })
    const data_paket_image = await paket_image.findAll({
      raw: true,
      attributes: [
        'paket_id', 'image'
      ],
      where: { paket_id },
    })
		if(data_paket){
				return res.status(200).json({ status: 200, response: 'Successful', data_paket: data_paket, data_paket_image: data_paket_image })
		}else{
			return res.status(200).json({ status: 200, response: 'Paket not found'})
		}        
	} catch(err){
		console.log(err.message)
		return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
	}
}