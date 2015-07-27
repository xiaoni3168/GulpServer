var fs = require('fs'),
    sqlite3 = require('sqlite3').verbose();

var file = './lol/sqlite3/dbs/lol.db';
var db = new sqlite3.Database(file);

var DBManager = {
    getDB: function() {
        if(db) {
            return db;
        } else {
            db = new sqlite3.Database(file);
            return db;
        }
    },

    closeDB: function() {
        db.close();
    }
}

module.exports = DBManager;
