const Sequelize = require("sequelize");
const db = require("./sequelize");
module.exports = db.sequelize.define(
  "peminjam",
  {
    id_peminjam: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true
    },
    id_buku:{
        type:Sequelize.INTEGER
    },
    id_petugas:{
        type:Sequelize.INTEGER
    },
    id_anggota:{
        type:Sequelize.INTEGER
    },
    waktu :{
        type: 'TIMESTAMP',
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    },
    waktu_kembali:{
        type:Sequelize.TEXT
    },
    kondisi:{
        type:Sequelize.TEXT
    }
  },
  { timestamps: false }
);
