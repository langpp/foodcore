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
    let date = req.body.date
    let subtotal = req.body.subtotal
    let total = req.body.total
    const resultCard = req.body.resultCard;
    const user_id = sc.sess.user_id
    const company_id = sc.sess.company_id
    
    // dataOrder= {
    //   user_id: user_id,
    //   company_id: company_id,
    //   date: date,
    //   total: total,
    //   status: 2
    // }
    // const newOrder = await order.create(dataOrder)
    console.log(resultCard)

    let regulerData = resultCard.find(obj => obj.type_paket === "Reguler")
    

    const order_id = regulerData.order_id
    // if(regulerData.count == 0){
      let dataOrder= {
        status: 2,
        subtotal: subtotal,
        total: total
      }
      await order.update(dataOrder, {
        where: {id: order_id}
      });
      let dataOrderItemReguler= {
        qty: regulerData.count,
        status: 2
      }
      await order_item.update(dataOrderItemReguler, {
        where: {order_id: order_id}
      });
      let orderPremium = resultCard.filter(obj => obj.type_paket !== "Reguler");
      let dataOrderItemPremium = orderPremium.map((item) => ({
        order_id: order_id,
        paket_id: item.id,
        qty: item.count,
        rate: item.rate,
        status: 2
      }));
      await order_item.bulkCreate(dataOrderItemPremium)
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
    //   let orderPremium = resultCard.filter(obj => obj.type_paket !== "Reguler");
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