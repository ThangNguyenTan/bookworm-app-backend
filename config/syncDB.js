const db = require("../models");

const syncBD = () => {
  db.sequelize
    .sync()
    .then(() => {
        console.log("Database Synced");
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = {
    syncBD
}
