'use strict'
const sequelize = require('../Repositories/connect_db');
const UserEntity = require('../Entities/UserEntity');
const { hasPasword } = require('../Utils/Bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    fakeData: async function (req, res) {
        let password = await hasPasword('123456');
        await sequelize.sync().then(() => {
            UserEntity.create({
                user_id: uuidv4(),
                full_name: "Bùi Quang Hiếu",
                email: "hieubqph13812@fpt.edu.vn",
                password: password,
            }).then(user => {
                res.json(user);
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });

        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    },
    findAllUser: function (req, res) {
        sequelize.sync().then(function () {
            UserEntity.findAll().then(users => {
                res.json(users);
            }).catch(error => {

            });
        });

    },
};
