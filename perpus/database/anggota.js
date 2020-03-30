const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "aggt",
  {
    id_anggota: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true
    },
    nama_anggota:{
      type:Sequelize.STRING
    },
    kelas: {
        type: Sequelize.STRING
    }    
  },
  { timestamps: false }
);
