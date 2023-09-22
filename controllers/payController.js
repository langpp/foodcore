const sc = require('../config/session.js')
const link = require('../config/link.js')
var secret = require('../config/secret.js');
const { Op } = require("sequelize")
const midtransClient = require('midtrans-client');
const { sequelize, users, order, order_item, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/index.js');
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
      session: sc.sess,
      snapLink: secret.snapLink,      
      clientID: secret.clientID
    });
	}else{
		res.redirect('/login')
	}  
}

exports.snapPay = async (req, res, next) => {
	sc.sess = req.session
	if (!(sc.sess.lng)) {
		sc.sess.lng = 'en'
	}
	if (sc.sess.phone) {
		let dates = req.body.date
		let waktu = req.body.waktu
		let total = req.body.total

		var checkstr = 'SELECT * FROM `order` WHERE status!=? AND user_id=? AND date!=? AND waktu !=? AND total !=?';

		var checkorder = await db.sequelize.query(checkstr, {
			replacements: [2, sc.sess.user_id, dates, waktu, total],
			type: db.sequelize.QueryTypes.SELECT,
		});
		if (checkorder[0]) {
			let inarr = checkorder.map(({
				id
			}) => id)
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

		var checkexist = 'SELECT * FROM `order` WHERE status!=? AND user_id=? AND date=? AND waktu =? AND total =?';

		var checkorderexist = await db.sequelize.query(checkexist, {
			replacements: [2, sc.sess.user_id, dates, waktu, total],
			type: db.sequelize.QueryTypes.SELECT,
		});

		if (checkorderexist[0]) {
			var now = new Date(); //todays date
			var end = checkorderexist[0].createdAt; // another date
			var diffMs = (now-end);
      var diffMins = Math.round(diffMs / 60000);
			if (diffMins >= 0 && diffMins <= 15) {
				return res.status(200).json({
					status: 200,
					response: 'Successful',
					result: checkorderexist[0].uid_midtrans,
					uid: checkorderexist[0].uid
				})
			} else {
				let inarr = checkorderexist.map(({
					id
				}) => id)
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
		}

		let snap = new midtransClient.Snap({
			isProduction: secret.isProduction,
			serverKey: secret.serverKey,
			clientKey: secret.clientID,
			MerchantID: secret.merchantID
		});

		// let subtotal = req.body.subtotal

		if (total < 1) {
			return res.status(500).json({
				status: 200,
				response: 'Transaksi Harus Lebih Dari Rp 0'
			})
		}
		var uid = uuidv4();
		const resultCard = req.body.resultCard;
		var totalorder = 0;
		var subtotalorder = 0;
		var updatereguler = 'N'
		var arr_items = [];
		resultCard.map(function(obj) {
			if (obj.type === "Premium") {
				totalorder = totalorder + (obj.rate * obj.count)
				subtotalorder = subtotalorder + (obj.rate * obj.count)
				arr_items.push({
					"name": obj.name,
					"price": parseFloat(obj.rate),
					"quantity": obj.count,
					"id": obj.id
				})
			} else {
				if (obj.count == 0) {
					totalorder = totalorder - 15000
					updatereguler = 'Y'
				} else {
					subtotalorder = subtotalorder + 15000
					arr_items.push({
						"name": obj.name,
						"price": 0,
						"quantity": obj.count,
						"id": obj.id
					})
				}
			}
		});
		let parameter = {
			"transaction_details": {
				"order_id": uid,
				"gross_amount": total
			},
			"customer_details": {
				first_name: sc.sess.name,
				last_name: '',
				phone: sc.sess.phone,
			},
			"item_details": arr_items,
			"enabled_payments": ["other_qris", "gopay"],
			"gopay": {
				"enable_callback": true,
				"callback_url": "http://localhost:3000/pay/callback"
			}
		};

		await snap.createTransaction(parameter)
			.then(async (transaction) => {
				const user_id = sc.sess.user_id
				const company_id = sc.sess.company_id
				const date = new Date(Date.UTC(
					parseInt(dates.substring(0, 4)),
					parseInt(dates.substring(5, 7)) - 1,
					parseInt(dates.substring(8, 10)),
					parseInt(0),
					parseInt(0),
					parseInt(0),
					parseInt(0)
				));

				let transactionToken = transaction.token;

				var dataOrder = {
					user_id: user_id,
					company_id: company_id,
					date: dates,
					total: totalorder,
					subtotal: subtotalorder,
					waktu: waktu,
					waktu_bayar: '1990-01-01 00:00:00',
					status: 1,
					uid: uid,
					uid_midtrans: transactionToken,
					update_reguler: updatereguler
				}
				const newOrder = await order.create(dataOrder)
				const order_id = newOrder.id

				let orderPremium = resultCard.filter(obj => obj.type !== "Reguler");
				let dataOrderItemPremium = orderPremium.map((item) => ({
					order_id: order_id,
					paket_id: item.id,
					qty: item.count,
					rate: item.rate,
					status: 1,
				}));
				await order_item.bulkCreate(dataOrderItemPremium)

				return res.status(200).json({
					status: 200,
					response: 'Successful',
					result: transactionToken,
					uid: uid
				})
			}).catch(err => {
        console.log(err)
				res.status(500).json({
					status: 500,
					response: 'Cannot create transaction!'
				})
			});
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

    let dataOrderloop = resultCard.map(function(obj) {
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
    var dateindo = new Date();
    var dataOrder= {
      user_id: user_id,
      company_id: company_id,
      date: dates,
      total: total,
      subtotal: subtotal,
      waktu: waktu,
      status: 2,
      update_reguler: updatereguler ? 'Y' : 'N',
      waktu_bayar: moment(dateindo).format('YYYY-MM-DD HH:mm:ss'),
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
    
    return res.status(200).json({ status: 200, response: 'Successful'})
	}else{
		res.redirect('/login')
	}
}

exports.changeStatus = async(req, res, next) =>{
  let uid_midtrans = req.query.uid_midtrans
  let uid = req.query.uid
  var checkstr = 'SELECT * FROM `order` WHERE uid_midtrans=? AND uid=? AND status=?';

  var checkorder = await db.sequelize.query(checkstr, {
    replacements: [uid_midtrans, uid, 1],
    type: db.sequelize.QueryTypes.SELECT,
  });
  if(checkorder[0]){
    const url = `https://api.sandbox.midtrans.com/v2/${uid}/status`;
    const options = {method: 'GET', headers: {accept: 'application/json', 'Authorization': `Basic ${btoa(secret.serverKey+':')}`}};

    await fetch(url, options)
      .then(res => res.json())
      .then(async(json) => {
        if(json.transaction_status == 'settlement'){
          if(checkorder[0].update_reguler == 'Y' && fraud_status == 'accept'){
            var checkpaket = 'SELECT * FROM jadwal_menu WHERE date(`date`)=? AND waktu=? AND company_id=? AND status=?';
            var getpaket = await db.sequelize.query(checkpaket, {
              replacements: [moment(checkorder[0].date).format('YYYY-MM-DD'), checkorder[0].waktu, checkorder[0].company_id, 2],
              type: db.sequelize.QueryTypes.SELECT,
            });

            dataJadwal= {
              qty_perubahan: getpaket[0].qty_perubahan - 1,
            }
            await jadwal_menu.update(dataJadwal, {
              where: {
                id: getpaket[0].id
              }
            });
          }
          
          var date = new Date();
          dataOrder= {
            waktu_bayar: moment(date).format('YYYY-MM-DD HH:mm:ss'),
            status: 2
          }

          await order.update(dataOrder, {
            where: {
              id: checkorder[0].id
            }
          });

          dataOrderdetail= {
            status: 2
          }

          await order_item.update(dataOrderdetail, {
            where: {
              order_id: checkorder[0].id
            }
          });
          return res.status(200).json({ status: 200, response: 'Successful'})
        }
      })
      .catch(err => res.status(500).json({ status: 500, response: 'Transaction not paid!'}));
    
  }else{
    return res.status(500).json({ status: 500, response: 'Data Not Found!'})
  }
}

exports.getPayFinish = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){        
    res.render('payFinish', { 
      title: 'Pembayaran Berhasil',
      session: sc.sess,
    });
	}else{
		res.redirect('/login')
	}  
}

exports.getPayUnfinish = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){        
    res.render('payUnfinish', { 
      title: 'Pembayaran Tertunda',
      session: sc.sess,
    });
	}else{
		res.redirect('/login')
	}  
}

exports.notification = async(req, res, next) =>{
  if(req.body.status_code == 200){
    var checkstr = 'SELECT * FROM `order` WHERE uid=? AND status=?';

    var checkorder = await db.sequelize.query(checkstr, {
      replacements: [req.body.order_id, 1],
      type: db.sequelize.QueryTypes.SELECT,
    });
    if(checkorder[0]){
      var date = new Date();
          dataOrder= {
          waktu_bayar: moment(date).format('YYYY-MM-DD HH:mm:ss'),
          status: 2
      }
  
      await order.update(dataOrder, {
          where: {
              id: checkorder[0].id
          }
      });
  
      dataOrderdetail= {
          status: 2
      }
  
      await order_item.update(dataOrderdetail, {
          where: {
              order_id: checkorder[0].id
          }
      });
      return res.status(200).json({ status: 200, response: 'Transaction Paid!'})
    }else{
      return res.status(500).json({ status: 500, response: 'Transaction Not Found!'})
    }
  }else{
    return res.status(201).json({ status: 201, response: 'Transaction Not Paid!'})
  }
}
