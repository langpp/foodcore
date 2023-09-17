const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, order, order_item, paket, paket_image, jadwal_menu } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')

exports.getOrder = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){    
    sc.sess.home = '/'
    res.render('user/order', { 
      title: 'Order',
      session: sc.sess,
      moment: moment,
      // data_company: data_company
    });
	}else{
		res.redirect('/login')
	}
}

exports.listOrder = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){    
    const user_id = sc.sess.user_id
    const tanggal = req.query.tanggal
    var datemin3 = new Date(new Date().setDate(new Date(tanggal).getDate() - 4));
    var dateadd3 = new Date(new Date().setDate(new Date(tanggal).getDate() + 4));
    if(tanggal){
      var where = { status: {[Op.ne]: 0, [Op.ne]: 1}, user_id, date: {[Op.between]: [datemin3, dateadd3] }}
    }else{
      var where = { status: {[Op.ne]: 0, [Op.ne]: 1}, user_id }
    }
		const data_order = await order.findAll({
      raw: true,
      attributes: ['id', 'status', 'createdAt', 
      'date', 
      // [sequelize.fn('date_format', sequelize.col('date'), '%d-%m-%Y'), 'date'],
      'total', 'waktu'],
      where: where,
      order: [
        ['id', 'ASC']
      ]
    })

    let allid_order = data_order.map(({ id }) => id)

    const data_order_item = await order_item.findAll({
      raw: true,
      attributes: [
        'qty', 'rate',
        [sequelize.col('paket.name'), 'paket'], [sequelize.col('paket.image1'), 'image1'], [sequelize.col('paket.image2'), 'image2'],
        [sequelize.col('order.date'), 'date'], [sequelize.col('order.total'), 'total'], [sequelize.col('order.id'), 'id']
      ],
      where: { 
        status: {[Op.ne]: 0}, 
        order_id: allid_order 
      },
      order: [
        ['id', 'ASC']
      ],
      include: [
        {
          model: paket,
          as: 'paket',  
          attributes: []
        },
        {
          model: order,
          as: 'order',  
          attributes: []
        },
      ]
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_order.map( Object.values ), order_details: data_order_item})
	}else{
		res.redirect('/login')
	}
}


/////////////////////////////////////////////////////////////////////
paket.hasMany(order_item, {
	foreignKey: 'id'
})
order_item.belongsTo(paket, {
	as: 'paket',
	foreignKey: 'paket_id',
	// targetKey: 'paket_id'
})

order.hasMany(order_item, {
	foreignKey: 'id'
})
order_item.belongsTo(order, {
	as: 'order',
	foreignKey: 'order_id',
	// targetKey: 'order_id'
})
/////////////////////////////////////////////////////////////////////
exports.detailOrder = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){    
    const user_id = sc.sess.user_id
    const order_id = req.query.order_id
		const data_order_item = await order_item.findAll({
      raw: true,
      attributes: [
        'qty', 'rate',
        [sequelize.col('paket.name'), 'paket'], [sequelize.col('paket.image1'), 'image1'], [sequelize.col('paket.image2'), 'image2'],
        [sequelize.col('order.date'), 'date'], [sequelize.col('order.total'), 'total']
      ],
      where: { 
        status: {[Op.ne]: 0}, 
        order_id,
        '$order.user_id$': user_id 
      },
      order: [
        ['id', 'ASC']
      ],
      include: [
        {
          model: paket,
          as: 'paket',  
          attributes: []
        },
        {
          model: order,
          as: 'order',  
          attributes: []
        },
      ]
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_order_item})
	}else{
		res.redirect('/login')
	}
}

exports.checkOrder = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){    
    const user_id = sc.sess.user_id
    const company_id = sc.sess.company_id
    const dateString = req.query.date
    const waktu = req.query.waktu
    const date = new Date(Date.UTC(
      parseInt(dateString.substring(0, 4)),
      parseInt(dateString.substring(5, 7))-1,
      parseInt(dateString.substring(8, 10)),
      parseInt(0),
      parseInt(0),
      parseInt(0),
      parseInt(0)
    ));

    const data_order = await jadwal_menu.findOne({
      raw: true,
      where: { company_id: company_id, date: date, status: 2, waktu: waktu }
    })

    const find_exist_order = await order.findOne({
      raw: true,
      where: { user_id: user_id, company_id: company_id, date: date, status: 2, waktu: waktu }
    })

    const find_exist_order_date = await order.findAll({
      raw: true,
      where: { user_id: user_id, company_id: company_id, date: date, status: 2, waktu: waktu }
    })

    if(data_order){
      const order_id = data_order.paket_id
    
      const data_order_item = await paket.findAll({
        raw: true,
        attributes: [
          'id', 'name', 'rate', 'image1', 'image2', 'type', 'status'],
        where: { 
          // status: {[Op.ne]: 0}, 
          id: order_id,
        },
        order: [
          ['id', 'ASC']
        ],
      })

      if(find_exist_order){
        return res.status(200).json({ status: 200, response: 'Existing', result: data_order_item, complateorder: find_exist_order_date})
      }

      return res.status(200).json({ status: 200, response: 'Successful', result: data_order_item, complateorder: find_exist_order_date})
    }else{
      return res.status(200).json({ status: 200, response: 'Not Found', result: [], complateorder: find_exist_order_date})
    }
    
	}else{
		res.redirect('/login')
	}
}