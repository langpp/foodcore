const sc = require('../../config/session.js')
const link = require('../../config/link.js')
var fs = require('fs')
const path = require("path")
const multer = require('multer');
// const filePath = path.join(__dirname, '../../public/img/product/')
const { Op } = require("sequelize")
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')
const XLSX = require('xlsx')




exports.getUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    sc.sess.home = '/'
    res.render('admin/user', { 
      title: 'Paket',
      session: sc.sess,
      moment: moment
    });
	}else{
		res.redirect('/login')
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////
company.hasMany(users, {foreignKey: 'company_id'})
users.belongsTo(company, { as:'company',  foreignKey: 'company_id', targetKey: 'id'  })
//////////////////////////////////////////////////////////////////////////////////////////////
exports.listUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)

  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      where_val = {
        company_id: company_id,
        status: {[Op.ne]: 0}, 
        userType: {[Op.ne]: 1} 
      }
    }else{
      where_val = { 
        status: {[Op.ne]: 0}, 
        userType: {[Op.ne]: 1} 
      }
    }
		const data_users = await users.findAll({
      raw: true,
      attributes: [
        'id','uid', 'name', 'phone',  'status',
        [sequelize.literal("CASE WHEN users.status = 1 THEN 'Belum Login' WHEN users.status = 2 THEN 'Sudah Login' END"), 'statusAlias'], 
        'company_id', [sequelize.col('company.name'), 'company'], 'userType',
        [sequelize.literal("CASE WHEN userType = 4 THEN 'Admin' WHEN userType = 5 THEN 'Karyawan' WHEN userType = 7 THEN 'Karyawan' END"), 'userTypeAlias']
      ],
      where: where_val,
      order: [
        ['name', 'ASC']
      ],
      include: [
        { 
          model: company, 
          as: 'company',
          attributes: []
        }
      ]
    })

    return res.status(200).json({ status: 200, response: 'Successful', result: data_users.map( Object.values )})
	}else{
		res.redirect('/login')
	}
}

exports.postUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const name = req.body.name
    const phone = validatePhone(req.body.phone)
    let company_id
    if(sc.sess.userType == 1){
      company_id = req.body.company_id
    }else if(sc.sess.userType == 4){
      company_id = sc.sess.company_id
    }
    const userType = req.body.userType

		if(phone && company_id && userType){
      try{
        dataUser= {
          name, phone, company_id, userType
        }
        await users.create(dataUser)
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message == 'Validation error')
        if(err.message == 'Validation error'){
          return res.status(200).json({ status: 200, response: 'Duplicate phone' })
        }else{
          return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
        }
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.putUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const id = req.body.id
    const name = req.body.name
    const phone = validatePhone(req.body.phone)
    const company_id = req.body.company_id
    const userType = req.body.userType
		if(phone && company_id && userType){
      try{
        dataUser= {
          name, phone, company_id, userType
        }
        await users.update(dataUser, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        if(err.message == 'Validation error'){
          return res.status(200).json({ status: 200, response: 'Duplicate phone' })
        }else{
          return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
        }
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Lengkapi Form!' })
    }
	}else{
		res.redirect('/login')
	}
}

exports.deleteUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    const id = req.body.id
		if(id){
      try{
        await users.update({status: 0}, {
          where: {id}
        });
        return res.status(200).json({ status: 200, response: 'Successful'})
      } catch(err){
        // console.log(err.message)
        return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
      }
    }else{
      return res.status(500).json({ status: 500, response: 'Pilih User yang akan dihapus' })
    }
	}else{
		res.redirect('/login')
	}
}

///////////////////////////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'excel/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
});
const upload = multer({ storage: storage });
exports.uploadFile =  upload.single('file')
//////////////////////////////////////////////////////////////////////////////////////////
exports.importUser = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    let company_id
    if(sc.sess.userType == 4){
      company_id = sc.sess.company_id
    }else{
      company_id = req.body.companyImport
    }
    const filename = req.file.filename;

    ///////////////////////////Baca Excel
    const workbook = XLSX.readFile('excel/'+filename);
    const sheetName = workbook.SheetNames[0]
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const arrayData = sheetData.map(obj => ({ ...obj, company_id: company_id }));
    if(arrayData){
      if(arrayData[0].phone){
        await users.bulkCreate(arrayData)
        return res.status(200).json({ status: 200, response: 'Successful'})
      }else{
        return res.status(200).json({ status: 200, response: 'No phone in excel'})
      }
    }else{
      return res.status(200).json({ status: 200, response: 'Error excel'})
    }		
	}else{
		res.redirect('/login')
	}
}

function validatePhone (phone){
  var phoneNumber = phone.replace(/ /g, '');
  phoneNumber = phoneNumber.replace(/-/g, '');
  phoneNumber = phoneNumber.replace(/\(/g, "");
  phoneNumber = phoneNumber.replace(/\)/g, "");
  if(phoneNumber.charAt(0) == "0"){
    phoneNumber = phoneNumber.substr(1);
    phoneNumber = '+62'+phoneNumber
  }else if(phoneNumber.charAt(0) != "+" && phoneNumber.charAt(0) != "0"){
    phoneNumber = '+'+phoneNumber
  }
  return phoneNumber;
}


exports.jumlahKaryawan = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  if(sc.sess.phone && (sc.sess.userType == 1 || sc.sess.userType == 4)){
    let where_val;
    if(sc.sess.userType == 4){
      const company_id = sc.sess.company_id
      where_val = {
        company_id: company_id,
        status: {[Op.ne]: 0}
      }
    }else{
      const company_id = req.query.company_id
      where_val = { 
        company_id: company_id,
        status: {[Op.ne]: 0}
      }
    }
    try{
      const data_users = await users.findAll({
        raw: true,
        attributes: ['id'],
        where: where_val
      })
  
      return res.status(200).json({ status: 200, response: 'Successful', result:data_users.length })
    } catch(err){
      // console.log(err.message)
      return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
    }
	}else{
		res.redirect('/login')
	}
}