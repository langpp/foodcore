module.exports = {
  db1:{
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "foodcore",
    dialect: "mysql",
    logging: false,
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
  
}