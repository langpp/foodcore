const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.singleDay = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(req.params.item){
    var item = req.params.item
    var itemObject = item.split("&")
    let cp, dateString
    for (let i = 0; i < itemObject.length; i++) {
      if(itemObject[i].split("=").length == 2){
        if(itemObject[i].split("=")[0].replace(/[^\w\s!?]/g,'') == 'cp'){
          cp = itemObject[i].split("=")[1].replace(/[^\w\s!?]/g,'')
        }else if(itemObject[i].split("=")[0].replace(/[^\w\s!?]/g,'') == 'date'){
          dateString = itemObject[i].split("=")[1].replace(/[^\w\s!?]/g,'')
        }
      }
    }
    const date = new Date(Date.UTC(
      parseInt(dateString.substring(0, 4)),
      parseInt(dateString.substring(4, 6))-1,
      parseInt(dateString.substring(6, 8)),
      parseInt(0),
      parseInt(0),
      parseInt(0),
      parseInt(0)
    ));
    
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
        '$company.kode$': cp,
        '$company.status$': {[Op.ne]: 0},
        date
      },
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
    
    if(data_jadwal_menu){
      // sc.sess.home = '/cp/'+req.params.item
      res.render('daymenu', { 
        title: 'Day Menu',
        session: sc.sess,
        moment: moment,
        data_jadwal_menu: data_jadwal_menu,
        date: date
      });
    }else{
      res.render("404.ejs");
    }
  }else{
    res.render("404.ejs");
  }

  
}