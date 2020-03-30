const express = require('express')
const body = require('body-parser')
const hash = require('password-hash')
const Cronofy = require('cronofy');
const jwt = require('jsonwebtoken')
const buku  =   require("./database/buku")
const anggota  =   require("./database/anggota")
const petugas  =   require("./database/petugas")
const peminjam  =   require("./database/peminjam")
const dbMANUAL = require("./database/sc_database")
const app = express()
const port = 80
app.use(body.urlencoded({extended:false}))
app.use(body.json())

app.get('/buku',(req,res)=>{
    buku.findAll({}).then(bukue=>{
        res.json(bukue)
    })
})
app.get('/petugas',(req,res)=>{
    petugas.findAll({}).then(petugase=>{
        res.json(petugase)
    })
})
app.get('/anggota',(req,res)=>{
    anggota.findAll({}).then(anggotae=>{
        res.json(anggotae)
    })
})
app.get('/peminjam',(req,res)=>{
    var sql =
    "SELECT peminjams.id_peminjam , peminjams.waktu , peminjams.waktu_kembali , peminjams.kondisi , nama_buku , info_buku , nama_petugas , jabatan_petugas , nama_anggota , kelas  "
    +" FROM peminjams INNER JOIN bukus ON peminjams.id_buku=bukus.id_buku"
    +" INNER JOIN petugas ON peminjams.id_petugas=petugas.id_petugas "
    +" INNER JOIN aggts ON peminjams.id_anggota=aggts.id_anggota";
    dbMANUAL.db.query(sql,(err,oyi)=>{
        res.json(oyi)
    })
})


app.post('/login/:opsi',(req,res)=>{
    var opsi = req.params.opsi
    if(opsi == 'petugas'){
        var data_login={
            us : req.body.us,
            pw : req.body.pw
        }
        petugas.findOne({where:{us : data_login.us}}).then(cekUS=>{
            if(cekUS){
                const verif = hash.verify(data_login.pw , cekUS.pw )
                if(verif){
                    const data = { idPetugas: cekUS.id_petugas };
                    const token = jwt.sign(data, "$petugas$perpustakaan$", {
                        expiresIn: "99999s"
                    });  
                    res.json(token + " | Login Petugas - "+cekUS.nama_petugas)
                }
                else{
                    res.json({ERROR : 'Username / password Tidak Sesuai /2'})
                }
            }else{
                res.json({ERROR : 'Username / password Tidak Sesuai /1'})
            }
        })
    }else{
        res.json({status:'URL Tidak Valid . Url yang tersedia Login = /petugas'})
    }
})

app.post('/daftar/:opsi',(req,res)=>{
    var opsi = req.params.opsi
    if(opsi == 'petugas'){
        var data_daftar={
            us              : req.body.us,
            pw              : hash.generate(req.body.pw),
            nama_petugas    : req.body.nama_petugas,
            jabatan_petugas : req.body.jabatan_petugas
        }
        petugas.findOne({where:{us : data_daftar.us}}).then(infodaftar=>{
            if(infodaftar){
                res.json({status:'Petugas Sudah Terdaftar'})
            }else{
                petugas.create(data_daftar).then(daftare=>{
                    res.json(daftare)
                })
            }
        })
    }else{
        res.json({status:'URL Tidak Valid . Url yang tersedia Daftar = /petugas'})
    }
})

app.post('/add/:opsi',(req,res)=>{
    const opsi = req.params.opsi
    //Nambah Buku
    if(opsi == 'buku'){
        console.log("tambah buku");
        var data_buku = {
            nama_buku   :req.body.nama_buku,
            info_buku   :req.body.info_buku,
            status_buku :0
        }        
        buku.findOne({where:{nama_buku:data_buku.nama_buku}}).then(cekbuku=>{
            if(cekbuku){
                res.json({status_buku:'Nama Buku Sudah terdaftar'})
            }else{
                buku.create(data_buku).then(tambahBuku=>{
                    res.json(tambahBuku)
                })                
            }
        })
    }
    //Nambah anggota
    else if(opsi == 'anggota'){
        console.log("tambah anggota");        
        var nama = req.body.nama_anggota
        var data_anggota = {
            nama_anggota    :nama.toUpperCase(),
            kelas           :req.body.kelas
        }   
                     
        anggota.findOne({where:{nama_anggota:data_anggota.nama_anggota}}).then(cekAnggota=>{
            if(cekAnggota){
                res.json({status:'Anggota Sudah Terdaftar'})
            }else{
                anggota.create(data_anggota).then(tambahAnggota=>{
                    res.json({tambahAnggota})
                })
            }
        })
    }    
    else{
        res.json({status:'URL Tidak Valid . Url yang tersedia /add = /buku|/anggota'})
    }
})

app.post('/meminjam',(req,res)=>{  
    const tokens = req.headers.petugaslogin;  
    if (!tokens) return res.json({ERROR : 'Admin Only - Silahkan Login Terlebih Dahulu'})
      jwt.verify(tokens, "$petugas$perpustakaan$", (err, decoded) => {
        if(err){res.json({ERROR : 'Admin Only - Silahkan Login Terlebih Dahulu'})}
        else{
            var nm = req.body.anggota
            var input={
                bukuQWE     : req.body.buku, //Memasukan Nama Buku                                 
                anggotaQWE  : nm.toUpperCase(), //memasukan Nama Anggota
                durasi      : req.body.lama_hari
            }    
            var ok = input.durasi.toString()            
            if(isNaN(ok)){
                res.json({ERROR : 'Masukan Angka Dalam Hitungan Hari'})
            }else{
                if(input.durasi > 7 ){
                    res.json({ERROR:'Maximal Peminjaman Buku Adalah 7 hari'})    
                }else{
                    var letters = /^[1-9]+$/;
                    if(!input.durasi.match(letters)){
                        res.json({ERROR:'Angka yang diperbolehkan 1 - 7'})    
                    }else{                    
                        buku.findOne({where:{nama_buku : input.bukuQWE}}).then(infoBuku=>{                
                            if(infoBuku){ 
                                if(infoBuku.status_buku == 1){
                                    res.json({status:'Buku Masih Dipinjam'})
                                }else{
                                    petugas.findOne({where:{id_petugas : decoded.idPetugas}}).then(infoPetugas=>{
                                        anggota.findOne({where:{nama_anggota : input.anggotaQWE}}).then(infoAnggota=>{
                                            if(infoAnggota){
                                                var data_pinjam = {
                                                    id_buku : infoBuku.id_buku,
                                                    id_petugas : infoPetugas.id_petugas,
                                                    id_anggota : infoAnggota.id_anggota,
                                                    waktu_kembali  : 'Dipinjam '+ input.durasi+' Hari.',
                                                    kondisi : 'Dipinjam'
                                                }
                                                peminjam.create(data_pinjam).then(minjam_buku=>{
                                                    buku.update({status_buku : 1},{where:{id_buku : infoBuku.id_buku}}).then(done=>{
                                                        res.json(minjam_buku)
                                                    })
                                                })
                                            }else{
                                                res.json({status:'Nama Anggota Tidak Sesuai / Tidak Ada . Silahkan cek => Localhost/buku , Atau Silahkan Daftar ke Petugas'})
                                            }
                                        })
                                    })
                                }
                            }else{
                                res.json({status:'Nama Buku Tidak Sesuai / Tidak Ada . Silahkan cek => Localhost/buku'})
                            }
                        })    
                    }
                }
            }                                   
        }
    });       
})
app.post('/mengembalikan',(req,res)=>{  
    const tokens = req.headers.petugaslogin;  
    if (!tokens) return res.json({ERROR : 'Admin Only - Silahkan Login Terlebih Dahulu'})
      jwt.verify(tokens, "$petugas$perpustakaan$", (err, decoded) => {
        if(err){res.json({ERROR : 'Admin Only - Silahkan Login Terlebih Dahulu'})}
        else{            
            var input={
                bukuASD     : req.body.buku
            }    
            buku.findOne({where:{nama_buku : input.bukuASD}}).then(infoBuku=>{                
                if(infoBuku){                     
                    if(infoBuku.status_buku == 0){
                        res.json({ERROR : 'Buku Belum Dipinjam'})
                    }else{                        
                        buku.update({status_buku : 0},{where:{id_buku : infoBuku.id_buku}}).then(updateBuku=>{
                            peminjam.update({kondisi : 'Sudah Dikembalikan'},{where:{id_buku : infoBuku.id_buku , kondisi : 'Dipinjam'}}).then(done=>{
                                res.json({status:' Berhasil Terkonfirmasi'})
                            })
                        })
                    }
                }else{
                    res.json({status:'Nama Buku Tidak Sesuai / Tidak Ada . Silahkan cek => Localhost/buku '})
                }
            })
        }
    });       
})

app.listen(port, () => console.log(`Gas keun bos`))