const sc = require('../config/session.js')
const md5 = require('md5')
var sha1 = require('sha1')
const admin = require('../config/adminGoogle.js').admin
const link = require('../config/link.js')
const { sequelize, users, company, paket, paket_image, jadwal_menu } = require('../models')
const moment = require('moment-timezone')




// //------------------------Definisi DB association------------------------//
// currency.hasMany(users, {foreignKey: 'currency_id'})
// users.belongsTo(currency, { as:'currency',  foreignKey: 'currency_id', targetKey: 'id'  })

// time_unit.hasMany(users, {foreignKey: 'time_unit_id'})
// users.belongsTo(time_unit, { as:'time_unit',  foreignKey: 'time_unit_id', targetKey: 'id'  })

// timezone.hasMany(users, {foreignKey: 'timezone_id'})
// users.belongsTo(timezone, { as:'timezone',  foreignKey: 'timezone_id', targetKey: 'id'  })

// users.hasMany(user_categories, {foreignKey: 'user_id'})
// user_categories.belongsTo(users, { as:'users',  foreignKey: 'user_id', targetKey: 'id'  })

// categories.hasMany(user_categories, {foreignKey: 'categories_id'})
// user_categories.belongsTo(categories, { as:'categories',  foreignKey: 'categories_id', targetKey: 'id'  })

// project.hasMany(project_categories, {foreignKey: 'project_id'})
// project_categories.belongsTo(project, { as:'project',  foreignKey: 'project_id', targetKey: 'id'  })

// categories.hasMany(project_categories, {foreignKey: 'categories_id'})
// project_categories.belongsTo(categories, { as:'categories',  foreignKey: 'categories_id', targetKey: 'id'  })

// currency.hasMany(project, {foreignKey: 'currency_id'})
// project.belongsTo(currency, { as:'currency',  foreignKey: 'currency_id', targetKey: 'id'  })

// time_unit.hasMany(project, {foreignKey: 'time_unit_id'})
// project.belongsTo(time_unit, { as:'time_unit',  foreignKey: 'time_unit_id', targetKey: 'id'  })

company.hasMany(jadwal_menu, {foreignKey: 'company_id'})
jadwal_menu.belongsTo(company, { as:'company',  foreignKey: 'company_id', targetKey: 'id'  })

paket.hasMany(jadwal_menu, {foreignKey: 'paket_id'})
jadwal_menu.belongsTo(paket, { as:'paket',  foreignKey: 'paket_id', targetKey: 'id'  })

paket_image.hasMany(paket, {foreignKey: 'id'})
paket.belongsTo(paket_image, { as:'image',  foreignKey: 'id', targetKey: 'paket_id'  })
// //----------------------------------------------------------------------//
async function lala(){    
  let kode = 'htp'
	const data_jadwal_menu = await jadwal_menu.findAll({
    raw: true,
    attributes: [
      'date',
      [sequelize.col('company.name'), 'company'],
      [sequelize.col('paket.id'), 'paket_id'],
      [sequelize.col('paket.name'), 'paket'],
    ],
    where: { '$company.kode$': kode },
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

  const data_image = await jadwal_menu.findAll({
    raw: true,
    attributes: [
      [sequelize.col('paket.id'), 'paket_id'],
      [sequelize.col('paket.image.image'), 'image'],
    ],
    where: { '$company.kode$': kode },
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
        include: [
          { 
            model: paket_image, 
            as: 'image',
            attributes: []
          },
        ]
      }
    ]
  })
	
	if(data_jadwal_menu){
    // console.log(data_jadwal_menu)
    // console.log(data_jadwal_menu.length)
    // console.log(data_categories.length)
    // console.log(sha1(md5('123456')))
	}else{
		console.log('No Data')
	}
}

// lala()


//--------------------show data from db to user timezone
// console.log(moment(data_users.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'))

//--------------------save data with user timzone to db
// console.log(moment.tz("2022-08-16 21:54:47", "Asia/Jakarta").format())

//--------------------Insert Table--------------------//
// const createUser = await users.create({ 
//   username: "indrabayu", 
//   email: "indrabayu@hotmail.com",
//   phone: "+62811904718",
//   first_name: "Indra",
//   last_name: "Bayu",
//   rate: "300",
//   bio: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>"
// })


//--------------------Update Table--------------------//
// var updateData = await users.update(
//   { tanggal: time2 },
//   { where: { id: 3 } }
// ).then(result =>
//   console.log(result)
// ).catch(err =>
//   console.log(err)
// )

exports.getLogin = async(req, res, next) =>{
  sc.sess=req.session
	if(sc.sess.email){
		// console.log(sc.sess.email)
		res.redirect('/')
	}else{
		res.render('login', { 
      title: 'Login',
      session: sc.sess
     })
	}
}


exports.postLogin = async(req, res, next) =>{
  sc.sess=req.session
  // console.log(req.body)
  const idTokenWeb = req.body.idToken
  const uidWeb = req.body.uid
  const password = req.body.password
  const userGoogle = await admin.auth().verifyIdToken(idTokenWeb)
    .then((decodedToken) => {
      if(decodedToken.uid == uidWeb){
        return decodedToken
      }else{
        return false
      }
    })
    .catch((error) => {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'gagal verifikasi firebase' })
    });
  
  if(userGoogle){
    const user = await users.findOne({where: { phone: userGoogle.phone_number }});    
    if(user){
      if(password.length >= 8){
        user.uid = userGoogle.uid
        user.token = req.body.idToken
        user.password = sha1(md5(req.body.password))
        user.status = 2
        await user.save();
        // console.log(user)

        // // req.session.lng = 'en'        
        // urlTo = req.protocol+'://'+req.get('host')+'/admin/client'
        req.session.user_id = user.id
        req.session.name = user.name
        req.session.uid = user.uid
				req.session.phone = user.phone       
        req.session.userType = user.userType
        if(user.company_id){
          req.session.company_id = user.company_id
        }

        var urlTo = '/'
        if(user.userType == 1){
          urlTo = req.protocol+'://'+req.get('host')+'/admin/client'
        }else if(user.userType == 4){
          urlTo = req.protocol+'://'+req.get('host')+'/admin/jadwal'
        }else if(user.userType == 5 || user.userType == 7){
          urlTo = req.protocol+'://'+req.get('host')+'/premium'
        }


        return res.status(200).json({ status: 200, response: 'succeed', url: urlTo})
      }else{
        return res.status(500).json({ status: 500, response: 'Password minimal 8 karakter.' })
      }      
    }else{
      return res.status(500).json({ status: 500, response: 'phone not valid' })
    }
  }else{
    return res.status(500).json({ status: 500, response: 'uid tidak cocok dengan decodeToken' })
  }
}

exports.checkPhone = async(req, res, next) =>{
  sc.sess=req.session
  const phone = validatePhone(req.body.phone)
  const user = await users.findOne({where: { phone }});
  if(user){
    if(user.password){
      return res.status(200).json({ status: 200, response: 'password exist'})
    }else{
      return res.status(200).json({ status: 200, response: 'password not exist'})
    }
  }else{
    return res.status(200).json({ status: 200, response: 'user not exist'})
  }
}

exports.loginPassword = async(req, res, next) =>{
  sc.sess=req.session
  const phone = validatePhone(req.body.phone)
  const password = sha1(md5(req.body.password))
  const user = await users.findOne({where: { phone, password }});
  if(user){
    req.session.user_id = user.id
    req.session.name = user.name
    req.session.uid = user.uid
    req.session.phone = user.phone
    req.session.userType = user.userType
    if(user.company_id){
      req.session.company_id = user.company_id
    }

    var urlTo = '/'
    if(user.userType == 1){
      urlTo = req.protocol+'://'+req.get('host')+'/admin/client'
    }else if(user.userType == 4){
      urlTo = req.protocol+'://'+req.get('host')+'/admin/jadwal'
    }else if(user.userType == 5 || user.userType == 7){
      urlTo = req.protocol+'://'+req.get('host')+'/premium'
    }
    
    return res.status(200).json({ status: 200, response: 'succeed', url: urlTo})
  }else{
    return res.status(200).json({ status: 200, response: 'Password incorrect'})
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

// exports.postLogin = async(req, res, next) =>{
//   sc.sess=req.session
//   const username = req.body.username
// 	const password = req.body.password
//   console.log(username)
// 	try{
// 		const data_users = await users.findOne({
// 			raw: true,
//       // attributes: [],
//       where: { username },
// 		})
// 		if(data_users){
// 			if(data_users.password != sha1(md5(password))){
// 				return res.status(200).json({ status: 200, response: 'Password incorrect'})
// 			}else{
//         req.session.user_id = data_users.id
// 				req.session.email = data_users.email
//         req.session.username = data_users.username
//         req.session.phone = data_users.phone
//         req.session.uid = data_users.uid
//         req.session.token = data_users.token
//         req.session.first_name = data_users.first_name
//         req.session.last_name = data_users.last_name
//         req.session.timezone_id = data_users.timezone_id
//         req.session.timezone = data_users['timezone.timezone']
//         req.session.linkedin = data_users.linkedin
//         req.session.birthday = data_users.birthday
//         req.session.rate = data_users.rate
//         req.session.bio = data_users.bio
//         req.session.time_unit_id = data_users.time_unit_id
//         req.session.time_unit_name = data_users['time_unit.name']
//         req.session.currency_id = data_users.currency_id
//         req.session.currency_name = data_users['currency.name']
//         req.session.currency_symbol = data_users['currency.symbol']
//         req.session.currency_country = data_users['currency.country']
//         req.session.currency_code = data_users['currency.code']
//         req.session.url = req.protocol + '://' + req.get('host')

//         req.session.lng = 'en'
        
//         urlTo = req.protocol+'://'+req.get('host')+'/admin/client'

// 				return res.status(200).json({ status: 200, response: 'Login successful', url: urlTo })
// 			}
// 		}else{
// 			return res.status(200).json({ status: 200, response: 'Username not found'})
// 		}        
// 	} catch(err){
// 		console.log(err.message)
// 		return res.status(500).json({ status: 500, response: 'Cannot connect to database' })
// 	}
// }


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBAmLid97zxuwNEUhO-xABuHTXBo6dXxWg",
//   authDomain: "catering-da52b.firebaseapp.com",
//   projectId: "catering-da52b",
//   storageBucket: "catering-da52b.appspot.com",
//   messagingSenderId: "53556742932",
//   appId: "1:53556742932:web:992f4c4d4840d224479001",
//   measurementId: "G-CTH469PXN7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);