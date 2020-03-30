const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "buku",
  {
    id_buku: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true
    },
    nama_buku:{
      type:Sequelize.STRING
    },
    info_buku: {
        type: Sequelize.STRING
    },
    status_buku:{
        type:Sequelize.INTEGER
    } 
  },
  { timestamps: false }
);
