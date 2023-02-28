'user strict';

const { Sequelize, DataTypes } = require("sequelize");
const config = require('../Utils/Config');
const sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
        host: config.db_host,
        dialect: config.db_dialect,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true,
        },
        timezone: config.timezone,
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;