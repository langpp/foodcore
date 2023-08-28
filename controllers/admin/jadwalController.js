const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, order, order_item, users, company, paket, paket_image, jadwal_menu } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')
const excelJS = require("exceljs");

exports.getJadwal = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){    
    sc.sess.home = '/'
    res.render('admin/jadwal', { 
      title: 'Jadwal',
      session: sc.sess,
      moment: moment,
      kode: null
    });
	}else{
		res.redirect('/login')
	}
}

exports.listJadwal = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    // const kode = req.query.kode
    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      if(req.query.tanggal){
        where_val = {
          '$company.id$': company_id,
          date: {
            [Op.gte]: req.query.tanggal
          },
          status: {[Op.ne]: 0}, 
        }
      }else{
        where_val = {
          '$company.id$': company_id,
          status: {[Op.ne]: 0}, 
        }
      }
    }else{
      if(req.query.tanggal && req.query.client){
        where_val = {
          date: {
            [Op.gte]: req.query.tanggal + ' 00:00:00'
          },
          company_id: req.query.client,
          status: {[Op.ne]: 0}, 
        }
      }else if(req.query.tanggal && !req.query.client){
        where_val = {
          date: {
            [Op.gte]: req.query.tanggal + ' 00:00:00'
          },
          status: {[Op.ne]: 0}, 
        }
      }else if(!req.query.tanggal && req.query.client){
        where_val = {
          company_id: req.query.client,
          status: {[Op.ne]: 0}, 
        }
      }else{
        where_val = {
          status: {[Op.ne]: 0}, 
        }
      }
    }

		const data_jadwal_menu = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'id','status',
        // 'date',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
        [sequelize.col('company.id'), 'id_client'],
        [sequelize.col('company.name'), 'client'],        
        [sequelize.col('paket.id'), 'id_paket'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.literal("CASE WHEN jadwal_menu.status = 1 THEN 'Belum Diproses' WHEN jadwal_menu.status = 2 THEN 'Diproses' WHEN jadwal_menu.status = 3 THEN 'Belum Bayar' WHEN jadwal_menu.status = 4 THEN 'Sudah Bayar' END"), 'statusAlias'],
        'qty', 'qty_perubahan', 'total',
        'waktu', 'sehat',
      ],
      where: where_val,
      order: [
        [sequelize.col('company.name'), 'ASC'],
        ['date', 'DESC'],
        // [sequelize.col('paket.name'), 'ASC']
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

    return res.status(200).json({ status: 200, response: 'Successful', result: data_jadwal_menu.map( Object.values )})
	}else{
		res.redirect('/login')
	}
}

exports.listJadwalexcel = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    // const kode = req.query.kode
    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      if(req.query.tanggal){
        where_val = {
          '$company.id$': company_id,
          date: {
            [Op.gte]: req.query.tanggal
          },
          status: {[Op.ne]: 0}, 
        }
      }else{
        where_val = {
          '$company.id$': company_id,
          status: {[Op.ne]: 0}, 
        }
      }
    }else{
      if(req.query.tanggal && req.query.client){
        where_val = {
          date: {
            [Op.gte]: req.query.tanggal + ' 00:00:00'
          },
          company_id: req.query.client,
          status: {[Op.ne]: 0}, 
        }
      }else if(req.query.tanggal && !req.query.client){
        where_val = {
          date: {
            [Op.gte]: req.query.tanggal + ' 00:00:00'
          },
          status: {[Op.ne]: 0}, 
        }
      }else if(!req.query.tanggal && req.query.client){
        where_val = {
          company_id: req.query.client,
          status: {[Op.ne]: 0}, 
        }
      }else{
        where_val = {
          status: {[Op.ne]: 0}, 
        }
      }
    }
    
		const data_jadwal_menu = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'id','status',
        // 'date',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
        [sequelize.col('company.id'), 'id_client'],
        [sequelize.col('company.name'), 'client'],        
        [sequelize.col('paket.id'), 'id_paket'],
        [sequelize.col('paket.name'), 'paket'],
        [sequelize.literal("CASE WHEN jadwal_menu.status = 1 THEN 'Belum Diproses' WHEN jadwal_menu.status = 2 THEN 'Diproses' WHEN jadwal_menu.status = 3 THEN 'Belum Bayar' WHEN jadwal_menu.status = 4 THEN 'Sudah Bayar' END"), 'statusAlias'],
        'qty', 'qty_perubahan', 'total',
        'waktu', 'sehat',
      ],
      where: where_val,
      order: [
        [sequelize.col('company.name'), 'ASC'],
        ['date', 'DESC'],
        // [sequelize.col('paket.name'), 'ASC']
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

    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("List Jadwal"); // New Worksheet
    const path = "./public/report-jadwal";  // Path to download excel

    worksheet.columns = [
      { header: "Tanggal", key: "date", width: 20 }, 
      { header: "Client", key: "client", width: 40 },
      { header: "Paket", key: "paket", width: 30 },
      { header: "Status", key: "statusAlias", width: 20 },
      { header: "QTY Awal", key: "qty", width: 15 },
      { header: "QTY Akhir", key: "qty_perubahan", width: 15 },
      { header: "Tagihan", key: "total", width: 15 },
      { header: "Waktu", key: "waktu", width: 15 },
      { header: "Sehat", key: "sehat", width: 15 },
    ];

    data_jadwal_menu.forEach((menu) => {
      worksheet.addRow(menu); // Add data in worksheet
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    try {
      const data = await workbook.xlsx.writeFile(`${path}/report-jadwal-${req.query.tanggal ? req.query.tanggal : ''}.xlsx`)
       .then(() => {
         res.send({
           status: "success",
           message: "file successfully downloaded",
           path: `/report-jadwal/report-jadwal-${req.query.tanggal ? req.query.tanggal : ''}.xlsx`,
          });
       });
    } catch (err) {
        res.send({
        status: "error",
        message: "Something went wrong",
      });
    }
	}else{
		res.redirect('/login')
	}
}

exports.getJadwalCp = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && sc.sess.userType == 1){  
    let kode = req.params.item

    const data_company = await company.findOne({
      raw: true,
      attributes: ['name'],
      where: { 
        kode
      }
    })
    if(data_company){
      sc.sess.home = '/'
      res.render('admin/jadwal', { 
        title: 'Jadwal Client',
        session: sc.sess,
        moment: moment,
        kode: kode
      });
    }else{
      res.redirect('/404')
    }
	}else{
		res.redirect('/login')
	}   
}

exports.postJadwal = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const date = req.body.date
    let company_id
    if(sc.sess.userType == 1){
      company_id = req.body.company_id
    }else if(sc.sess.userType == 4){
      company_id = sc.sess.company_id
    }    
    const paket_id = req.body.paket_id
    const waktu = req.body.waktu
    const sehat = req.body.sehat
		if(date && company_id && paket_id){
      try{
        const data_users = await users.findAll({
          raw: true,
          attributes: [ [sequelize.col('id'), 'user_id'], 'company_id'],
          where: {
            company_id: company_id,
            status: {[Op.ne]: 0}
          }
        })

        const rate_paket = await paket.findOne({
          raw: true,
          attributes: [ 'rate'],
          where: {
            id: paket_id
          }
        })      
        let rate = rate_paket.rate
        let totalTagihan = 0
        if(data_users){
          totalTagihan = rate * data_users.length
        }

        // let dataOrder = data_users.map(function(obj) {
        //   return {...obj, date: date, subtotal: rate, total: 0};
        // });
        // const newOrder = await order.bulkCreate(dataOrder)

        // let dataOrderItem = newOrder.map(function(order) {
        //   return { 
        //     order_id: order.dataValues.id,
        //     paket_id: paket_id,
        //     qty: 1,
        //     rate: rate
        //   };
        // });
        // await order_item.bulkCreate(dataOrderItem)

        dataJadwal= {
          date: date,
          company_id: company_id,
          paket_id: paket_id,
          waktu: waktu,
          sehat: sehat,
          qty: data_users.length,
          qty_perubahan: data_users.length,
          total: totalTagihan
        }
        await jadwal_menu.create(dataJadwal)
        
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.putJadwal = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
    const date = req.body.date
    const company_id = req.body.company_id
    const paket_id = req.body.paket_id
    const waktu = req.body.waktu
    const sehat = req.body.sehat
		if(date && company_id && paket_id){
      try{
        dataJadwal= {
          date: date,
          company_id: company_id,
          paket_id: paket_id,
          waktu: waktu,
          sehat: sehat
        }
        await jadwal_menu.update(dataJadwal, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.deleteJadwal = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
		if(id){
      try{
        await jadwal_menu.update({status: 0}, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Pilih Jadwal yang akan dihapus' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.changeStatus = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const id = req.body.id
    const status = req.body.status
		if(id && status){
      try{
        dataJadwal= {
          status: status
        }
        await jadwal_menu.update(dataJadwal, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}