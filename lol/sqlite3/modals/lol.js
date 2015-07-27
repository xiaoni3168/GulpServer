var DBManager = require('../DBManager.js'),
    Q = require('q');

var TableLol = {
    findAll: function() {
        var def = Q.defer();
        var db = DBManager.getDB();
        db.all('SELECT * FROM LOL', function(err, rows) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(rows);
            }
        });
        return def.promise;
    }
}

module.exports = TableLol;
