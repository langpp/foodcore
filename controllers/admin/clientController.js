const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')


exports.getClient = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && sc.sess.userType == 1){    
    sc.sess.home = '/'
    res.render('admin/client', { 
      title: 'Client',
      session: sc.sess,
      moment: moment,
      // data_company: data_company
    });
	}else{
		res.redirect('/login')
	}
}

exports.listClient = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone && sc.sess.userType == 1){
		const data_company = await company.findAll({
      raw: true,
      attributes: ['id','status', 'name', 'kode', 'keterangan', 'createdAt'],
      where: { status: {[Op.ne]: 0} },
      order: [
        ['name', 'ASC']
      ]
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_company.map( Object.values )})
	}else{
		res.redirect('/login')
	}
}

exports.postClient = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const name = req.body.name
    const kode = req.body.kode
    const keterangan = req.body.keterangan
    console.log(keterangan)
		if(name.trim() !== '' && kode.trim() !== ''){
      try{
        dataClient= {
          name: name,
          kode: kode,
          keterangan: keterangan
        }
        await company.create(dataClient)
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

exports.putClient = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
    const name = req.body.name
    const kode = req.body.kode
    const keterangan = req.body.keterangan
		if(name.trim() !== '' && kode.trim() !== ''){
      try{
        dataClient= {
          name: name,
          kode: kode,
          keterangan: keterangan
        }
        await company.update(dataClient, {
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

exports.deleteClient = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && sc.sess.userType == 1){
    const id = req.body.id
		if(id){
      try{
        await company.update({status: 0}, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Pilih Client yang akan dihapus' })
    }
	}else{
		res.redirect('/login')
	}
}