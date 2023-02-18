"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const mysql2 = require("mysql2");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/../config/config.json")[env];
const db = {};

if (!config) {
  config = {
    "username": "sql12599202",
    "password": "Qjm3mbqhNu",
    "database": "sql12599202",
    "host": "sql12.freesqldatabase.com",
    "dialect": "mysql"
  }
}

if (config.dialect === 'mysql') {
  config.dialectModule = mysql2;
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
