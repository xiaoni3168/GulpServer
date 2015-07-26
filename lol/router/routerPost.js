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
        res.send(req.body);
    }
}

module.exports = RouterPost;
