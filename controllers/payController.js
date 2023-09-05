const sc = require('../config/session.js')
const link = require('../config/link.js')
const { Op } = require("sequelize")
const midtransClient = require('midtrans-client');
const { sequelize, users, order, order_item, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
moment.locale('id')

exports.getPay = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){        
    res.render('pay', { 
      title: 'Pembayaran',
      session: sc.sess
    });
	}else{
		res.redirect('/login')
	}  
}

exports.snapPay = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone){
    let snap = new midtransClient.Snap({
      isProduction : false,
      serverKey : 'SB-Mid-server-VWyX4wAPyn8j4PZhsHgGuB_k',
      clientKey : 'SB-Mid-client-DcCuq4OcwlgozvHl'
    });

    let date = req.body.date
    let subtotal = req.body.subtotal
    let total = req.body.total

    let parameter = {
      "transaction_details": {
          "order_id": "Transaksi Tanggal "+ Math.random() * 10,
          "gross_amount": total
      }, "credit_card":{
          "secure" : true
      }
    };

    snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        return res.status(200).json({ status: 200, response: 'Successful', result:transactionToken})
    })
  }

}

exports.confirmPay = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone){
    let dates = req.body.date
    let waktu = req.body.waktu
    // let subtotal = req.body.subtotal
    // let total = req.body.total
    const resultCard = req.body.resultCard;
    const user_id = sc.sess.user_id
    const company_id = sc.sess.company_id
    const date = new Date(Date.UTC(
      parseInt(dates.substring(0, 4)),
      parseInt(dates.substring(5, 7))-1,
      parseInt(dates.substring(8, 10)),
      parseInt(0),
      parseInt(0),
      parseInt(0),
      parseInt(0)
    ));
    var total = 0;
    var subtotal = 0;
    var updatereguler = false
    const find_exist_order = await order.findOne({
      raw: true,
      where: { user_id: user_id, company_id: company_id, date: date, status: 2, waktu: waktu }
    })
    
    if(find_exist_order){
      return res.status(200).json({ status: 200, response: 'Data Order Pada Tanggal Dan Waktu Tersebut Sudah Ada! Silahkan Pilih Tanggal & Waktu Lain!'})
    }

    let dataOrderloop = resultCard.map(function(obj) {
      // console.log(obj)
      if(obj.type === "Premium"){
        total = total + (obj.rate*obj.count)
        subtotal = subtotal + (obj.rate*obj.count)
      }else{
        if(obj.count == 0){
          total = total - 15000
          updatereguler = true
        }else{
          subtotal = subtotal + 15000
        }
      }
    });

    var dataOrder= {
      user_id: user_id,
      company_id: company_id,
      date: dates,
      total: total,
      subtotal: subtotal,
      waktu: waktu,
      status: 2
    }
    const newOrder = await order.create(dataOrder)
    const order_id = newOrder.id

    let orderPremium = resultCard.filter(obj => obj.type !== "Reguler");
    let dataOrderItemPremium = orderPremium.map((item) => ({
      order_id: order_id,
      paket_id: item.id,
      qty: item.count,
      rate: item.rate,
      status: 2
    }));
    await order_item.bulkCreate(dataOrderItemPremium)
    if(updatereguler){
      const data_menu = await jadwal_menu.findOne({
        raw: true,
        where: { company_id, date }
      })

      await jadwal_menu.update({
          qty_perubahan : data_menu.qty_perubahan - 1,
      }, {
          where: {
              id: data_menu.id,
          },
      })
    }
    
    // // if(regulerData.count == 0){
      // let dataOrder= {
      //   status: 2,
      //   subtotal: subtotal,
      //   total: total,
      //   user_id: user_id,
      //   company_id: company_id,
      //   date: regulerData.tanggal,
      // }
      // await order.create(dataOrder);

      // let dataOrderItemReguler= {
      //   qty: regulerData.count,
      //   status: 2
      // }
      // await order_item.create(dataOrderItemReguler, {
      //   where: {order_id: order_id}
      // });
    //   let orderPremium = resultCard.filter(obj => obj.type !== "Reguler");
    //   let dataOrderItemPremium = orderPremium.map((item) => ({
    //     order_id: order_id,
    //     paket_id: item.id,
    //     qty: item.count,
    //     rate: item.rate,
    //     status: 2
    //   }));
    //   await order_item.bulkCreate(dataOrderItemPremium)


    // }else{
    //   let dataOrder= {
    //     status: 2,
    //     total: total
    //   }
    //   await order.update(dataOrder, {
    //     where: {id: order_id}
    //   });
    //   let dataOrderItemReguler= {
    //     qty: regulerData.count,
    //     status: 2
    //   }
    //   await order_item.update(dataOrderItemReguler, {
    //     where: {order_id: order_id}
    //   });
    //   let orderPremium = resultCard.filter(obj => obj.type !== "Reguler");
    //   let dataOrderItemPremium = orderPremium.map((item) => ({
    //     order_id: order_id,
    //     paket_id: item.id,
    //     qty: item.count,
    //     rate: item.rate,
    //     statu
    //   }));
    //   await order_item.bulkCreate(dataOrderItemPremium)
    // }
    
    return res.status(200).json({ status: 200, response: 'Successful'})
	}else{
		res.redirect('/login')
	}
}