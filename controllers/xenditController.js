const sc = require('../config/session.js')
var secret = require('../config/secret.js');
const { sequelize } = require('../models')
const { Xendit, Invoice: InvoiceClient } =  require('xendit-node');
const xenditClient = new Xendit({secretKey: secret.xenditKey})
const { CreateInvoiceRequest, Invoice } =  require('xendit-node/invoice/models')

const xenditInvoiceClient = new InvoiceClient({secretKey: secret.xenditKey})

exports.getIndex = async(req, res, next) =>{
    const data = {
        "amount": 10000,
        "invoiceDuration": 172800,
        "externalId": "test1234",
        "description": "Test Invoice",
        "currency": "IDR",
        "reminderTime": 1,
        "paymentMethods": ['QRIS']
    };
      
    await xenditInvoiceClient.createInvoice({
        data
    }).then((response) => {
        console.log(response)
        res.render('xendit/index', { 
            title: 'Xendit',
            xenditData: response
          });
    }).catch((error) => {
        console.log(error)
        res.redirect('/login')
    });
}