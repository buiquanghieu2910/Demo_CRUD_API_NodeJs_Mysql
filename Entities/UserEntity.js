const { DataTypes } = require('sequelize');
var sequelize = require('../Repositories/connect_db');

const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


// sequelize.sync({ force: true }).then(() => {
//     console.log('Users table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });

module.exports = User;
