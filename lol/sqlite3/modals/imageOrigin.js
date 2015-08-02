var DBManager = require('../DBManager.js'),
    Q = require('q');

var TableImageOrigin = {
    insert: function(imageFile) {
        var def = Q.defer();
        var db = DBManager.getDB();
        var sql = 'INSERT INTO image_origin(image, image_name, image_size, upload_date) values(?, ?, ?, ?)';
        var params = [imageFile.image, imageFile.imageName, imageFile.imageSize, new Date().getTime()];
        db.run(sql, params, function(err, data) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve();
            }
        });
        return def.promise;
    },

    findAll: function() {
        var def = Q.defer();
        var db = DBManager.getDB();
        var sql = 'SELECT * FROM image_origin';
        db.all(sql, function(err, rows) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(rows);
            }
        });
        return def.promise;
    }
}

module.exports = TableImageOrigin;
