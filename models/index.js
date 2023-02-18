"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const mysql2 = require("mysql2");
const basename = path.basename(__filename);
let config = null;
const db = {};

if (!config) {
  config = {
    "username": "umqrszam",
    "password": "nJlbrxqIIq4l_2YWU88CAmAjpu2B-Kpk",
    "database": "umqrszam",
    "host": "rosie.db.elephantsql.com",
    "dialect": "postgres",
    "operatorsAliases": 0,
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
