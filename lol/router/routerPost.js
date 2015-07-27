var ModalDispacher = require('../sqlite3/ModalDispacher.js'),
    ResponseBuilder = require('../util/ResponseBuilder.js');

var RouterPost = {
    recive: function(req, res) {
        var url = req.url.toLowerCase();
        switch (url) {
            case '/unlockdb':
                this.unlockDb(req, res);
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
        });
    }
}

module.exports = RouterPost;
