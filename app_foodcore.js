const sc = require('./config/session.js')
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path')
const { I18n } = require('i18n')
const { sequelize } = require('./models');
const routes = require('./routes');

// Sequelize for seasion
const Sequelize = require("sequelize");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
// create database, ensure 'sqlite3' in your package.json
var sequelizeSession = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./config/session.sqlite",
  logging: false
});

// express app
const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

///////////////////agar api dapat diakses dari domain berbeda
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

let mySessionStore = new SequelizeStore({
  db: sequelizeSession,
  // checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});
app.use(session({
  name: 'epakar',
	secret: 'secret-key-epakar',
  store: mySessionStore,
	resave: false,
	saveUninitialized: false
}))
mySessionStore.sync();

app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// Bilingual
const i18n = new I18n({
  locales: ['en', 'id'],
  directory: path.join(__dirname, 'locales')
})
app.use(i18n.init)

app.use('/', routes);

// 404 page
app.use((req, res) => {
  sc.sess=req.session
  res.render('404', { 
    title: '404',
    session: sc.sess
  });
});

//Server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server started on port ${port}`)
	// await sequelize.authenticate()
	// sequelize
	// 	// .sync()
	// 	.sync({ alter: true })
	// 	.then(result => {
	// 		// console.log(result)
	// 	})
	// 	.catch(err => {
	// 		// console.log(err)
	// 	})
	console.log('Database Connected!')
})