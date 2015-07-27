var express = require('express'),
    bodyParser = require('body-parser');
var app = express();

/** Static path define*/
app.set('LOL_ROUTE', './lol/router');
/** End*/

/** Routers*/
var routerDispacher = require(app.get('LOL_ROUTE') + '/routerDispacher.js');
/** End*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res) {
    routerDispacher.dispacher(req, res);
});

app.listen(80);
