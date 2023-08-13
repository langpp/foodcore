'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require("../config/db.js")
const db = {}

const db1 = new Sequelize(config.db1.DB, config.db1.USER, config.db1.PASSWORD, {
  host: config.db1.HOST,
  dialect: config.db1.dialect,
  logging: config.db1.logging,
  operatorsAliases: config.db1.operatorsAliases,
  
  // logging: console.log, //untuk menampilkan query yang dibuat dalam bentuk string

  pool: {
    max: config.db1.pool.max,
    min: config.db1.pool.min,
    acquire: config.db1.pool.acquire,
    idle: config.db1.pool.idle,
  },
})

// const db2 = new Sequelize(config.db2.DB, config.db2.USER, config.db2.PASSWORD, {
  // host: config.db2.HOST,
  // dialect: config.db2.dialect,
  // logging: config.db2.logging,
  // operatorsAliases: config.db2.operatorsAliases,

  // pool: {
    // max: config.db2.pool.max,
    // min: config.db2.pool.min,
    // acquire: config.db2.pool.acquire,
    // idle: config.db2.pool.idle,
  // },
// })

fs
  .readdirSync(__dirname + '/db1')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname + '/db1', file))(db1, Sequelize.DataTypes)
    db[model.name] = model
  })

// fs
  // .readdirSync(__dirname + '/db2')
  // .filter(file => {
    // return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  // })
  // .forEach(file => {
    // const model = require(path.join(__dirname + '/db2', file))(db2, Sequelize.DataTypes)
    // db[model.name] = model
  // })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = db1
// db.sequelize = db2
// db.Sequelize = Sequelize

module.exports = db
