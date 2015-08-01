var DBManager = require('./DBManager.js'),
    Q = require('q');

var DatabaseBuilder = {
    showTables: function() {
        var def = Q.defer();
        var db = DBManager.getDB();
        db.all('SELECT name FROM sqlite_master where type="table" order by name', function(err, data) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });
        return def.promise;
    },

    showTableSchemas: function(tableName) {
        var def = Q.defer();
        var db = DBManager.getDB();
        db.all('PRAGMA table_info(' + tableName + ')', function(err, data) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });
        return def.promise;
    },

    createTable: function(params) {
        var def = Q.defer();
        var db = DBManager.getDB();
        var sql = 'CREATE TABLE ' + params.tableName + ' (';
        for(var i = 0; i < params.colums.length; i ++) {
            sql = sql + params.colums[i]['name'] + ' ' + params.colums[i]['type'] + ' ';
            if(params.colums[i]['notNull']) {
                sql = sql + 'NOT NULL ';
            }
            if(params.colums[i]['pk']) {
                sql = sql + 'PRIMARY KEY ';
            }
            if(i != (params.colums.length - 1)) {
                sql = sql + ',';
            }
        }
        sql = sql + ')';
        console.log(sql);
        db.run(sql, function(err, data) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve();
            }
        });
        return def.promise;
    },

    dropTable: function(tableName) {
        var def = Q.defer();
        var db = DBManager.getDB();
        var sql = 'DROP TABLE ' + tableName;
        db.run(sql, function(err, data) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve();
            }
        });
        return def.promise;
    }
}

module.exports = DatabaseBuilder;
