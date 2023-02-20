'user strict';

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    'demo_crud_nodejs_mysql', //Tên database
    'root',//Username database
    'Hieu12345.',//Password database
    {
        host: 'localhost',//Host
        dialect: 'mysql',//Loại SQL
        timezone: "Asia/Ho_Chi_Minh"//Múi giờ
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;