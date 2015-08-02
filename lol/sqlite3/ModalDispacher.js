var DatabaseBuilder = require('./DatabaseBuilder.js');
var TableLol = require('./modals/lol.js');
var TableImageOrigin = require('./modals/imageOrigin.js');

var ModalDispacher = {
    DatabaseBuilder: DatabaseBuilder,
    TableLol: TableLol,
    TableImageOrigin: TableImageOrigin
}

module.exports = ModalDispacher;
