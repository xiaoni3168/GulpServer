var ModalDispacher = require('../sqlite3/ModalDispacher.js'),
    ResponseBuilder = require('../util/ResponseBuilder.js');

var RouterPost = {
    recive: function(req, res) {
        var url = req.url.toLowerCase().split('?')[0];
        switch (url) {
            case '/unlockdb':
                this.unlockDb(req, res);
                break;
            case '/getdatabaseinfo':
                this.getDatabaseInfo(req, res);
                break;
            case '/createtable':
                this.createTable(req, res);
                break;
            case '/droptable':
                this.dropTable(req, res);
                break;
            case '/uploadimage':
                this.uploadImage(req, res);
                break;
            default:
                break;
        }
    },

    unlockDb: function(req, res) {
        var TableLol = ModalDispacher.TableLol;
        TableLol.findAll().then(function(result) {
            if(result && result.length > 0) {
                if(result[0].lolname == req.body.secretWord) {
                    ResponseBuilder.status(200).entity('SUCCESS').end(res);
                } else {
                    res.sendStatus(400);
                }
            }
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    },

    getDatabaseInfo: function(req, res) {
        var DatabaseBuilder = ModalDispacher.DatabaseBuilder;
        var type = req.body.postType;
        if(type == 1) {
            DatabaseBuilder.showTables().then(function(result) {
                ResponseBuilder.status(200).entity(result).end(res);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
        }
        if(type == 2) {
            DatabaseBuilder.showTableSchemas(req.body.tableName).then(function(result) {
                ResponseBuilder.status(200).entity(result).end(res);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
        }
    },

    createTable: function(req, res) {
        var DatabaseBuilder = ModalDispacher.DatabaseBuilder;
        var tableName = req.query.tableName;
        var params = {
            tableName: tableName,
            colums: req.body
        }
        DatabaseBuilder.createTable(params).then(function(result) {
            ResponseBuilder.status(200).entity({msg: 'Build Success'}).end(res);
        }, function(err) {
            if(err.errno == 1) {
                res.sendStatus(501);
            }
        });
    },

    dropTable: function(req, res) {
        var DatabaseBuilder = ModalDispacher.DatabaseBuilder;
        var tableName = req.query.tableName;
        DatabaseBuilder.dropTable(tableName).then(function(result) {
            ResponseBuilder.status(200).entity({msg: 'Drop Success'}).end(res);
        }, function(err) {
            res.sendStatus(500);
        });
    },

    uploadImage: function(req, res) {
        var TableImageOrigin = ModalDispacher.TableImageOrigin;
        var imageFile = req.body;
        TableImageOrigin.insert(imageFile).then(function(result) {
            ResponseBuilder.status(200).entity({msg: 'Upload Success'}).end(res);
        }, function(err) {
            res.sendStatus(500);
        });
    }
}

module.exports = RouterPost;
