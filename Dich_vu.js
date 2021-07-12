const express = require("express")
const app = express();
var Note_Dich_Vu = require('http');
var Port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
var Xu_ly_3L = require('./Xu_ly/Xu_ly_3L');
var Dung_chung = require('./Xu_ly/Dung_chung');
const uri = 'mongodb+srv://KIMITENLA:kimi1997@cluster0-f7nu1.gcp.mongodb.net/test?retryWrites=true&w=majority';
var cors = require('cors')

app.use(cors())
//const uri = 'mongodb://localhost:27017/'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var Dich_vu = Note_Dich_Vu.createServer((Yeu_cau, Dap_ung) => {
    let method = Yeu_cau.method
    let url = Yeu_cau.url
    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    Dap_ung.setHeader('Access-Control-Allow-Credentials', true)

    let db = "Meeting"


    if (method == "GET") {

        if (url == "/Thong_tin_cuoc_hop") {
            let collection = "Thong_tin_cuoc_hop"// n chỏ tới đây rồi chuyển qua bên kia xử lý
            client.connect(uri => {
                Xu_ly_3L.Doc_Danh_sach(collection, db, client).then(result => {
                    result2 = []
                    result.forEach(element => {

                        result2.push(
                            {
                                "_id": element._id,
                                "status": element.status,
                                "tencuochop": element.tencuochop,
                                "nhanvien": element.nhanvien,
                                "timebatdau": element.timebatdau,
                                "noidung": element.noidung,
                                "nguoichutri": element.nguoichutri,
                                "diadiem": element.diadiem,
                                "ngayhop": element.ngayhop,

                            }
                        )
                    })
                    Dap_ung.writeHead(200, { "Content-Type": "Text/json; charset=utf-8" })
                    Dap_ung.end(JSON.stringify(result2));
                })
            })

        }
    }
    else {

        var Noi_dung_Nhan = '';
        Yeu_cau.on('data', function (data) {
            Noi_dung_Nhan += data
        })
        if (url == "/update_cuoc_hop") {
            let collection = "Thong_tin_cuoc_hop"
            Yeu_cau.on('end', function () {

                client.connect(uri => {
                    Xu_ly_3L.update_cuoc_hop(collection, Noi_dung_Nhan, db, client).then(result => {
                        Dap_ung.writeHead(200, { "Content-Type": "Text/json; charset=utf-8" })
                        Dap_ung.end(JSON.stringify(result));
                    })
                })
            })
        }
        else if (url == "/Register_cuoc_hop") {
            let collection = "Thong_tin_cuoc_hop"
            Yeu_cau.on('end', function () {

                client.connect(uri => {
                    Xu_ly_3L.Register_cuoc_hop(collection, Noi_dung_Nhan, db, client).then(result => {

                        Dap_ung.writeHead(200, { "Content-Type": "Text/json; charset=utf-8" })
                        Dap_ung.end(JSON.stringify(result));
                    })

                })
            })

        }
        else if (url == "/delete_cuoc_hop") {
            let collection = "Thong_tin_cuoc_hop"
            Yeu_cau.on('end', function () {
                client.connect(uri => {
                  
                    Xu_ly_3L.delete_cuoc_hop(collection, Noi_dung_Nhan, db, client).then(result => {
                        Dap_ung.writeHead(200, { "Content-Type": "Text/json; charset=utf-8" })
                        Dap_ung.end(JSON.stringify(result));
                    })
                })
            })
        }



    }
})



Dich_vu.listen(Port,
    console.log(`Service Run: http://localhost:${Port}`)
)