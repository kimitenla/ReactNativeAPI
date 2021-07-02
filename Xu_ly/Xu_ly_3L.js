

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




module.exports = {
    Doc_Danh_sach,
    
}