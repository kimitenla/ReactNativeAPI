

function Doc_Danh_sach(Loai_Doi_tuong, db, client) {
    return new Promise(function (resolve, reject) {

        var database = client.db(db);
        collection = database.collection(Loai_Doi_tuong);
        collection.find({}).toArray(function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}

function Register_cuoc_hop(Loai_Doi_tuong, Noi_dung_nhan, db, client) {
    return new Promise(function (resolve, reject) {
        console.log("Noi_dung_nhan trong xu ly 3l")
            console.log(JSON.parse(Noi_dung_nhan))
            console.log(Noi_dung_nhan,"123123111")
        var database = client.db(db);
        var collection = database.collection(Loai_Doi_tuong);
        let Doi_tuong = JSON.parse(Noi_dung_nhan);
        let Ket_qua = {
            "Noi_dung": false,

        };

        collection.find().sort({ "_id": -1 }).limit(1).toArray((err, result) => {
           
            if (err) {
                
                console.log(err)
            } else {
                if (result.length == 0) {
                    var Danh_sach_cuochop = {
                        "status": 2,
                        "tencuochop": "Demo",
                        "nhanvien": "ADMIN",
                        "timebatdau": "Chưa cập nhật",
                        "noidung": "Chưa cập nhật",
                        "nguoichutri": "Chưa cập nhật",
                        "diadiem": "Chưa cập nhật",
                        "ngayhop": "Chưa cập nhật",
                        
                       

                        
                    }
                } else {
                    var Danh_sach_cuochop = {
                        "status": Doi_tuong.status, 
                        "tencuochop": Doi_tuong.title,
                        "nhanvien": Doi_tuong.user,
                        "timebatdau": Doi_tuong.time,
                        "noidung": Doi_tuong.description,
                        "nguoichutri": Doi_tuong.userlead,
                        "diadiem": Doi_tuong.address,
                        "ngayhop": Doi_tuong.date,
                       
                    }
                }
                console.log(Danh_sach_cuochop,"Danh_sach_cuochop")
                collection.insertOne(Danh_sach_cuochop, function (err, result) {
                    if (err) {
                    } else {
                        Ket_qua.Noi_dung = true
                        resolve(Ket_qua)

                    }
                })
            }
        })
    })
}

function update_cuoc_hop(Loai_Doi_tuong, Noi_dung_nhan, db, client) {
    return new Promise(function (resolve, reject) {

        var database = client.db(db);
        var collection = database.collection(Loai_Doi_tuong);
        let Doi_tuong = JSON.parse(Noi_dung_nhan);
        let Ket_qua = { "Noi_dung": "Lỗi cập nhật" };
        let dk = {
            id: Doi_tuong._id
        }
        
        let gt = {
            $set: { 
                        status: Doi_tuong.status, 
                        tencuochop: Doi_tuong.tencuochop, 
                        nhanvien: Doi_tuong.nhanvien,
                        timebatdau: Doi_tuong.timebatdau, 
                        noidung: Doi_tuong.noidung,
                        nguoichutri: Doi_tuong.nguoichutri,
                        diadiem: Doi_tuong.diadiem, 
                        ngayhop: Doi_tuong.ngayhop, 
                 }
        }
        collection.updateOne(dk, gt, (err, result) => {
            if (err) {
                reject(err)
            } else {
                Ket_qua.Noi_dung = true;
                resolve(Ket_qua)
            }
        })
    })
}


module.exports = {
    Doc_Danh_sach,
    update_cuoc_hop,
    Register_cuoc_hop,
    
}