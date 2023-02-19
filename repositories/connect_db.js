'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Hieu12345.',
    database : 'demo_crud_nodejs_mysql',
    insecureAuth : true
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
