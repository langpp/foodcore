const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, order, order_item, users, company, paket, paket_image, jadwal_menu } = require('../../models')
const db = require('../../models/index.js');
const moment = require('moment-timezone')
moment.locale('id')
const excelJS = require("exceljs");
const path = require("path");
var root = path.dirname(require.main.filename || process.mainModule.filename);
const fs = require("fs");
var mv = require('mv');
var formidable = require('formidable');

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

exports.getJadwalDetail = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){    
    sc.sess.home = '/'

    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      where_val = {
        id: req.params.id,
        '$company.id$': company_id,
        status: {[Op.ne]: 0}, 
      }
    }else{
        where_val = {
          id: req.params.id,
          status: {[Op.ne]: 0}, 
        }
    }

		const data_jadwal_menu = await jadwal_menu.findAll({
      raw: true,
      attributes: [
        'id','status',
        // 'date',
        [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'dates'],
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
    if(!data_jadwal_menu[0]){
      res.redirect('/')
    }else{
      var checkstr = 'SELECT COUNT(id) as banyak, SUM(total) as total FROM `order` WHERE date=? AND waktu=? AND status=?';
      var datesql = data_jadwal_menu[0].dates;
      var waktusql = data_jadwal_menu[0].waktu;
      var checkorder = await db.sequelize.query(checkstr, {
          replacements: [datesql, waktusql, 2],
          type: db.sequelize.QueryTypes.SELECT,
      });

      res.render('admin/jadwaldetail', { 
        title: 'Jadwal Detail',
        session: sc.sess,
        moment: moment,
        kode: req.params.id,
        jadwal: data_jadwal_menu[0],
        order: checkorder[0]
      });
    }
  }else{
		res.redirect('/login')
	}
}

exports.getJadwalDetailApi = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){    
    sc.sess.home = '/'

    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      where_val = {
        id: req.params.id,
        '$company.id$': company_id,
        status: {[Op.ne]: 0}, 
      }
    }else{
        where_val = {
          id: req.params.id,
          status: {[Op.ne]: 0}, 
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
    if(!data_jadwal_menu[0]){
      res.redirect('/')
    }

    var checkstr = 'SELECT a.*, b.name, b.phone FROM `order` as a JOIN users as b on b.id = a.user_id WHERE a.date=? AND a.waktu=? AND a.company_id=? AND a.status=?';

    var checkorder = await db.sequelize.query(checkstr, {
        replacements: [data_jadwal_menu[0].date, data_jadwal_menu[0].waktu, data_jadwal_menu[0].id_client, 2],
        type: db.sequelize.QueryTypes.SELECT,
    });

    let inarr = checkorder.map(({ id }) => id)

    if(inarr.length > 0){
      var checkstrorder = 'SELECT a.*, b.name, b.rate FROM order_item as a JOIN paket as b on b.id = a.paket_id WHERE a.order_id IN(?) AND a.status=?';

      var checkorderlist = await db.sequelize.query(checkstrorder, {
          replacements: [inarr, 2],
          type: db.sequelize.QueryTypes.SELECT,
      });
    }else{
      var checkorderlist = [];
    }
    
    return res.status(200).json({ status: 200, response: 'Successful', result: checkorder, resultlist: checkorderlist})
	}else{
		return res.redirect('/login')
	}
}

exports.getJadwalSumApi = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){    
    sc.sess.home = '/'

    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      where_val = {
        id: req.params.id,
        '$company.id$': company_id,
        status: 2, 
      }
    }else{
        where_val = {
          id: req.params.id,
          status: 2, 
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
    if(!data_jadwal_menu[0]){
      res.redirect('/')
    }

    var checkstr = 'SELECT sum(b.qty) as total, c.name FROM `order` as a JOIN order_item as b on b.order_id = a.id JOIN paket as c on c.id = b.paket_id WHERE a.date=? AND a.waktu=? AND a.company_id=? AND a.status=? GROUP BY b.paket_id';

    var sumorder = await db.sequelize.query(checkstr, {
        replacements: [data_jadwal_menu[0].date, data_jadwal_menu[0].waktu, data_jadwal_menu[0].id_client, 2],
        type: db.sequelize.QueryTypes.SELECT,
    });

    var checkstrjadwal = 'SELECT a.qty_perubahan as total, c.name FROM `jadwal_menu` as a JOIN paket as c on c.id = a.paket_id WHERE a.date=? AND a.waktu=? AND a.company_id=? AND a.status=? GROUP BY a.paket_id;';

    var checkjadwal = await db.sequelize.query(checkstrjadwal, {
        replacements: [data_jadwal_menu[0].date, data_jadwal_menu[0].waktu, data_jadwal_menu[0].id_client, 2],
        type: db.sequelize.QueryTypes.SELECT,
    });
    
    return res.status(200).json({ status: 200, response: 'Successful', result: sumorder, resultjadwal: checkjadwal[0]})
	}else{
		return res.redirect('/login')
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
        [sequelize.col('paket.rate'), 'rate'],
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
    const qty = req.body.qty
		if(date && company_id && paket_id){
      try{
        const getJadwal = await jadwal_menu.findOne({
          raw: true,
          where: {
            company_id: company_id,
            date: date,
            waktu: waktu,
          }
        })

        if(getJadwal){
          return res.status(500).json({ status: 500, response: 'Sudah Ada Jadwal Pada Tanggal & Waktu Tersebut!' })
        }

        const rate_paket = await paket.findOne({
          raw: true,
          attributes: [ 'rate'],
          where: {
            id: paket_id
          }
        })      
        var rate = rate_paket.rate
        var totalTagihan = rate * qty

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
          qty: qty,
          qty_perubahan: qty,
          total: totalTagihan
        }
        await jadwal_menu.create(dataJadwal)
        
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
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
    const jumlah = req.body.jumlah
    const qty = req.body.qty
    const qtyperubahan = req.body.qtyperubahan
    const harga = req.body.harga
		if(date && company_id && paket_id){
      try{
        var totalharga = jumlah * harga;
        var qty_s = qty - qtyperubahan;
        dataJadwal= {
          date: date,
          company_id: company_id,
          paket_id: paket_id,
          waktu: waktu,
          sehat: sehat,
          qty: jumlah,
          qty_perubahan: jumlah-qty_s,
          total: totalharga
        }
        await jadwal_menu.update(dataJadwal, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
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
        // console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Pilih Jadwal yang akan dihapus' })
    }
	}else if(sc.sess.phone && sc.sess.userType == 4){
    const id = req.body.id
		if(id){
      try{
        await jadwal_menu.update({status: 0}, {
          where: {id, status: 1}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
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
        // console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.kirimBuktiBayar = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 4)){
    var filename = ''
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      if (files) {
        foto = files.files != null ? files.files : null;
          if (foto) {
              if (foto[0].mimetype == "image/png" || foto[0].mimetype == "image/jpg" || foto[0].mimetype == "image/jpeg") {
                  var id = fields.id[0]
                  filename = id+".png";
                  fs.stat(root + "/public/invoice/" + filename, function (err, stats) {
                    fs.unlink(root + "/public/invoice/" + filename,function(err){
                    });  
                  });
                  var oldpath = files.files[0].filepath;
                  var newpath = root + "/public/invoice/" + filename;
                  mv(oldpath, newpath, function (err) {

                  });

                  return res.status(200).json({
                      error: false,
                      response: "Success",
                  })
              }else{
                  return res.status(200).json({
                      error: true,
                      response: "File Type Not Accept!",
                  });
              }
          }else{
              return res.status(200).json({
                  error: true,
                  response: "File Cannot Empty!",
              });     
          }
      }else{
          return res.status(200).json({
              error: true,
              response: "File Cannot Empty!",
          });      
      }
    })
	}else{
		res.redirect('/login')
	}
}

exports.deleteExpired = async(req, res, next) =>{
  var checkstr = 'SELECT * FROM `order` WHERE status!=? AND DATE(`date`) > CURDATE()';

  var checkorder = await db.sequelize.query(checkstr, {
    replacements: [2],
    type: db.sequelize.QueryTypes.SELECT,
  });

  if(checkorder[0]){
    let inarr = checkorder.map(({ id }) => id)
    await order_item.destroy({
      where: {
        [Op.and]: {
          order_id: inarr,
        }
      } 
    })

    await order.destroy({
      where: {
        [Op.and]: {
          id: inarr,
        }
      } 
    })
  }
  return res.status(200).json({ status: 200, response: 'Successful'})
}