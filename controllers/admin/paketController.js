const sc = require('../../config/session.js')
const link = require('../../config/link.js')
var fs = require('fs')
const path = require("path")
const filePath = path.join(__dirname, '../../public/img/product/')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.getPaket = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && sc.sess.userType == 1){    
    sc.sess.home = '/'
    res.render('admin/paket', { 
      title: 'Paket',
      session: sc.sess,
      moment: moment
    });
	}else{
		res.redirect('/login')
	}
}

exports.listPaket = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const type = req.query.type

    if(type){
      where_val = { 
        type,
        status: {[Op.ne]: 0},
       }
    }else{
      where_val = { 
        status: {[Op.ne]: 0},
       }
    }
		const data_paket = await paket.findAll({
      raw: true,
      attributes: ['id','status', 'name', 'keterangan', 'type', 'kategori', 'rate'],
      where: where_val,
      order: [
        ['type', 'DESC'],
        ['name', 'ASC']
      ]
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_paket.map( Object.values )})
	}else{
		res.redirect('/login')
	}
}

exports.listPaketuser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 7)){
    const type = req.query.type
    const id = req.query.id

    if(type && id){
      where_val = { 
        id,
        type,
        status: {[Op.ne]: 0},
       }
    }else if(!type && id){
      where_val = { 
        id,
        status: {[Op.ne]: 0},
       }
    }else if(type && !id){
      where_val = { 
        type,
        status: {[Op.ne]: 0},
       }
    }else{
      where_val = { 
        status: {[Op.ne]: 0},
       }
    }

		const data_paket = await paket.findAll({
      raw: true,
      attributes: ['id','status', 'name', 'keterangan', 'type', 'kategori', 'rate', 'image1', 'image2'],
      where: where_val,
      order: [
        ['type', 'DESC'],
        ['name', 'ASC']
      ]
    })
    const updateDataPaket = data_paket.map(obj => ({ ...obj, rateThousand: thousandSeparator(Math.floor(obj.rate)) }));

    return res.status(200).json({ status: 200, response: 'Successful', result: updateDataPaket})
	}else{
		res.redirect('/login')
	}
}

exports.postPaket = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const name = req.body.name
    const rate = req.body.harga
    const type = req.body.type
    const kategori = req.body.kategori
    const keterangan = req.body.keterangan

    var fullname_image1;
    var string_image1 = req.body.image1;
    if(string_image1){
      fullname_image1 = await uploadFoto(string_image1)
    }

    var fullname_image2;
    var string_image2 = req.body.image2;
    if(string_image2){
      fullname_image2 = await uploadFoto(string_image2)
    }

    // console.log(keterangan)
		if(name.trim() !== ''){
      try{
        dataPaket= {
          name: name,
          rate: rate,
          type: type,
          kategori: kategori,
          keterangan: keterangan
        }
        if(fullname_image1){
          dataPaket.image1 = fullname_image1
        }
        if(fullname_image2){
          dataPaket.image2 = fullname_image2
        }
        // console.log(dataPaket)

        await paket.create(dataPaket)
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

exports.putPaket = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
    const name = req.body.name
    const rate = req.body.harga
    const type = req.body.type
    const kategori = req.body.kategori
    const keterangan = req.body.keterangan

    var fullname_image1;
    var string_image1 = req.body.image1;
    if(string_image1){
      fullname_image1 = await uploadFoto(string_image1)
    }

    var fullname_image2;
    var string_image2 = req.body.image2;
    if(string_image2){
      fullname_image2 = await uploadFoto(string_image2)
    }

		if(name.trim() !== ''){
      try{
        dataPaket= {
          name: name,
          rate: rate,
          type: type,
          kategori: kategori,
          keterangan: keterangan
        }
        if(fullname_image1){
          dataPaket.image1 = fullname_image1
        }
        if(fullname_image2){
          dataPaket.image2 = fullname_image2
        }
        await paket.update(dataPaket, {
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

exports.deletePaket = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
		if(id){
      try{
        await paket.update({status: 0}, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Pilih Paket yang akan dihapus' })
    }
	}else{
		res.redirect('/login')
	}
}

async function uploadFoto(string){
  var string = string;
  var regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = string.match(regex);
  var ext = matches[1];
  var data = matches[2];
  var buffer = Buffer.from(data, 'base64');
  var name = randomNumber()
  var fullname = name+'.'+ext
  // console.log(fullname)
  fs.writeFile(filePath + name +'.' + ext, buffer, function (err) {
    // console.log('success ft_tm');
  });
  return fullname
}


function randomNumber(){
  var value = Math.floor(Math.random() * 9000000000) + 1000000000;
  return value;
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