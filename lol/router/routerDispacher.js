var routerGet = require('./routerGet.js');
var routerPost = require('./routerPost.js');

var RouterDispacher = {
    test: function(req, res) {
        console.log('this is router dispacher');
    },

    dispacher: function(req, res) {
        var method = req.method.toLowerCase();

        switch (method) {
            case 'get':
                routerGet.recive(req, res);
                break;
            case 'post':
                routerPost.recive(req, res);
                break;
            default:
                break;
        }
    }
}

module.exports = RouterDispacher;
