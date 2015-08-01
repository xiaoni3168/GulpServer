var express = require('express'),
    bodyParser = require('body-parser');
var app = express();

/** Static path define*/
app.set('LOL_ROUTE', './lol/router');
app.set('port', process.env.PORT || 5000);
/** End*/

/** Routers*/
var routerDispacher = require(app.get('LOL_ROUTE') + '/routerDispacher.js');
/** End*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res) {
    routerDispacher.dispacher(req, res);
});

app.listen(app.get('port'));
console.log('Server run at port ' + app.get('port'));
