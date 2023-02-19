'user strict';

// var mysql = require('mysql2');

// //local mysql db connection
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Hieu12345.',
//     database : 'demo_crud_nodejs_mysql',
//     insecureAuth : true
// });
// // connect to database
// connection.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = connection;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    'demo_crud_nodejs_mysql',
    'root',
    'Hieu12345.',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;