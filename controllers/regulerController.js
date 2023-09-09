const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.getReguler = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){
    let whereValue={}
    let whereValue2={}

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    if(sc.sess.company_id){
      whereValue = {
        status: {[Op.ne]: 1},
        company_id: sc.sess.company_id,
        '$company.status$': {[Op.ne]: 0},
        date: {
          [Op.gte]: today
        }        
      }
      whereValue2 = {
        status: {[Op.ne]: 1},
        company_id: sc.sess.company_id,
        '$company.status$': {[Op.ne]: 0},
        date: {
          [Op.gte]: today
        }
      }
    }else{
      whereValue = {
        status: {[Op.ne]: 1},
        '$company.status$': {[Op.ne]: 0},
        date: {
          [Op.gte]: today
        }        
      }
      whereValue2 = {
        status: {[Op.ne]: 1},
        '$company.status$': {[Op.ne]: 0},
        date: {
          [Op.gte]: today
        }
      }
    }

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
      // limit: 7,
      where: whereValue,
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

    const jadwal_detail = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'date', 'waktu', 'sehat',
        [sequelize.col('company.name'), 'company'],
        [sequelize.col('paket.id'), 'paket_id'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.col('paket.keterangan'), 'keterangan'],
        [sequelize.col('paket.image1'), 'image1'],
        [sequelize.col('paket.image2'), 'image2'],
      ],
      limit: 7,
      where: whereValue,
      order: [
        ['waktu', 'ASC'],
        ['sehat', 'ASC'],
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
    // console.log(jadwal_detail[0])
    // let data_jadwal_detail = jadwal_detail.map(obj => ({ ...obj, date: moment(obj.date).format('YYYY-MM-DD') }));
    // console.log(data_jadwal_detail[0])
    if(data_jadwal_menu){
      res.render('reguler', { 
        title: 'Menu Reguler',
        session: sc.sess,
        moment: moment,
        data_jadwal_menu: data_jadwal_menu,
        data_jadwal_detail: jadwal_detail
      });
    }else{
      res.render("404.ejs");
    }
	}else{
		res.redirect('/login')
	}
  
}

exports.listMenuDay = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  
  if(sc.sess.phone){
    const dateString = req.query.date
    const date = new Date(Date.UTC(
      parseInt(dateString.substring(0, 4)),
      parseInt(dateString.substring(4, 6))-1,
      parseInt(dateString.substring(6, 8)),
      parseInt(0),
      parseInt(0),
      parseInt(0),
      parseInt(0)
    ));
    let whereValue={}
    if(sc.sess.company_id){
      whereValue = {
        status: {[Op.ne]: 0},
        company_id: sc.sess.company_id,
        '$company.status$': {[Op.ne]: 0},
        date
      }
    }else{
      whereValue = {
        status: {[Op.ne]: 0},
        '$company.status$': {[Op.ne]: 0},
        date
      }
    }
		const data_jadwal_menu = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'date', 'waktu', 'sehat',
        [sequelize.col('company.name'), 'company'],
        [sequelize.col('paket.id'), 'paket_id'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.col('paket.keterangan'), 'keterangan'],
        [sequelize.col('paket.image1'), 'image1'],
        [sequelize.col('paket.image2'), 'image2'],
      ],
      limit: 7,
      where: whereValue,
      order: [
        ['waktu', 'ASC'],
        ['sehat', 'ASC'],
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
    // console.log(data_jadwal_menu)

    return res.status(200).json({ status: 200, response: 'Successful', result: data_jadwal_menu})
	}else{
		res.redirect('/login')
	}
}