var mysql = require('mysql')
var koneksi = mysql.createConnection({    
    host:'localhost',
    user:'root',
    password:'',
    database:'perpus',
    multipleStatements:true
})

module.exports.db = koneksi;