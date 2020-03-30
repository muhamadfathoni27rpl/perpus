const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "petuga",
  {
    id_petugas: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true
    },
    us:{
      type:Sequelize.STRING
    },
    pw:{
      type:Sequelize.STRING
    },    
    nama_petugas:{
      type:Sequelize.STRING
    },
    jabatan_petugas: {
        type: Sequelize.STRING
    }    
  },
  { timestamps: false }
);
