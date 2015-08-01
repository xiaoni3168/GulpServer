var ModalDispacher = require('../sqlite3/ModalDispacher.js'),
    ResponseBuilder = require('../util/ResponseBuilder.js');

var RouterGet = {
    recive: function(req, res) {
        var url = req.url.toLowerCase();
        if(url.indexOf('/gettables') > -1) this.getTables(req, res);
        switch (url) {
            case '/gettables':
                this.getTables(req, res);
                break;
            default:
                break;
        }
    },

    getTables: function(req, res) {
        var DatabaseBuilder = ModalDispacher.DatabaseBuilder;
        DatabaseBuilder.showTables().then(function(result) {
            ResponseBuilder.status(200).entity(result).end(res);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    }
}

module.exports = RouterGet;
