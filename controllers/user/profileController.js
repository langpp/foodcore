const sc = require('../../config/session.js')
const link = require('../../config/link.js')
const { Op } = require("sequelize")
const { sequelize, users, company, order, order_item, paket, paket_image, jadwal_menu, paket_like } = require('../../models')
const moment = require('moment-timezone')
moment.locale('id')
const path = require("path");
var root = path.dirname(require.main.filename || process.mainModule.filename);
const fs = require("fs");
var mv = require('mv');
var formidable = require('formidable');

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

exports.getProfile = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){    
    sc.sess.home = '/'
    const user_id = sc.sess.user_id

    const data_user = await users.findOne({
      raw: true,
      // attributes: ['id','status', 'name', 'rate,', 'keterangan', 'type'],
      where: { 
        id: user_id ,
      },
      order: [
        ['name', 'ASC']
      ]
    })

    res.render('user/profile', { 
      title: 'Profile',
      session: sc.sess,
      moment: moment,
      data_user: data_user
    });
	}else{
		res.redirect('/login')
	}
}

exports.changeProfile = async(req, res, next) =>{
  sc.sess=req.session
  if(!(sc.sess.lng)){
    sc.sess.lng = 'en'
  }
  req.setLocale(sc.sess.lng)
  if(sc.sess.phone){    
    sc.sess.home = '/'
    const user_id = sc.sess.user_id
    var filename = ''
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      if (files.foto) {                
        foto = files.foto != null ? files.foto : null;
        if (foto) {
            if (foto[0].mimetype == "image/png" || foto[0].mimetype == "image/jpg" || foto[0].mimetype == "image/jpeg") {
                filename = user_id+".png";
  
                fs.stat(root + "/public/profile/" + filename, function (err, stats) {
                    fs.unlink(root + "/public/profile/" + filename,function(err){
                    });  
                });
                var oldpath = files.foto[0].filepath;
                var newpath = root + "/public/profile/" + filename;
                mv(oldpath, newpath, function (err) {

                });
  
                var edit = await users.update({
                    name : fields.name[0],
                    address : fields.alamat[0],
                    email : fields.email[0],
                    foto_profile: filename
                }, {
                    where: {
                        id: user_id,
                    },
                })
              
              if(!edit){
                return res.status(200).json({
                    error: true,
                    response: "Failed Update Data!",
                })
              }
  
              return res.status(200).json({
                error: false,
                response: "Success Update Data!",
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
        var edit = await users.update({
            name : fields.name[0],
            address : fields.alamat[0],
            email : fields.email[0],
        }, {
            where: {
                id: user_id,
            },
        })
        if(!edit){
          return res.status(200).json({
              error: true,
              response: "Failed Update Data!",
          })
        }
  
        return res.status(200).json({
          error: false,
          response: "Success Update Data!",
        })
      }
    })
    
	}else{
		res.redirect('/login')
	}
}

exports.getFavorite = async(req, res, next) =>{
    sc.sess=req.session
    if(!(sc.sess.lng)){
      sc.sess.lng = 'en'
    }
    req.setLocale(sc.sess.lng)
    if(sc.sess.phone && (sc.sess.userType == 5 || sc.sess.userType == 7)){  
      const user_id = sc.sess.user_id
      const data_paket = await paket_like.findAll({
        where: { 
          user_id: user_id,
        },
        attributes: [
          [sequelize.col('paket_like.id'), 'like'],
          [sequelize.col('paket_like.user_id'), 'user_id'],
          [sequelize.col('paket.id'), 'paket_id'],
          [sequelize.col('paket.name'), 'name'],
          [sequelize.col('paket.keterangan'), 'keterangan'],
          [sequelize.col('paket.image1'), 'image1'],
          [sequelize.col('paket.rate'), 'rate'],
          [sequelize.col('paket.image2'), 'image2'],
        ],
        include: [
          { 
            model: paket, 
            as: 'paket',
          },
        ]
      })
      

      const updateDataPaket = data_paket.map(obj => ({ ...obj.dataValues, rateThousand: thousandSeparator(Math.floor(obj.dataValues.rate)) }));
      sc.sess.home = '/'
      res.render('user/favorite', { 
        title: 'Favorite',
        session: sc.sess,
        moment: moment,
        data_paket: updateDataPaket
        // data_company: data_company
      });
      }else{
          res.redirect('/login')
      }
  }