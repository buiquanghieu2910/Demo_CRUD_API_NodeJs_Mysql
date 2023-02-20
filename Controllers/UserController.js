'use strict'
const sequelize = require('../Repositories/Connect_db');
const UserEntity = require('../Entities/UserEntity');
const { hasPasword, checkPassword } = require('../Utils/Bcrypt');
const { v4: uuidv4 } = require('uuid');
const { returnJsonError } = require('../Utils/Common');

module.exports = {
    //Fake 1 record
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
                console.log(error);
                returnJsonError(res, 400, 'Fake data failed');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },

    //Create user
    store: async function (req, res) {
        let data = req.body;
        let password = await hasPasword(data['password']);
        await sequelize.sync().then(() => {
            UserEntity.create({
                user_id: uuidv4(),
                full_name: data['full_name'],
                email: data['email'],
                password: password,
            }).then(user => {
                res.json(user);
            }).catch((error) => {
                console.log(error);
                returnJsonError(res, 400, 'Create user failed');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },

    //Get all users
    findAllUser: function (req, res) {
        sequelize.sync().then(function () {
            UserEntity.findAll().then(users => {
                res.json(users);
            }).catch(error => {
                console.log(error);
                returnJsonError(res, 400, 'Get data faild');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },

    //Get user by id
    findById: function (req, res) {
        sequelize.sync().then(function () {
            UserEntity.findByPk(req.params.id).then(user => {
                res.json(user);
            }).catch(error => {
                console.log(error);
                returnJsonError(res, 400, 'Get user failed');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });

    },

    //Update user by id
    update: function (req, res) {
        sequelize.sync().then(async function () {
            let data = req.body;
            let passwordOld = await UserEntity.findByPk(req.params.id).then(user => {
                return user['password'];
            }).catch(error => {
                console.log(error);
                returnJsonError(res, 400, 'Update user failed');
            });

            UserEntity.update({
                full_name: data['full_name'],
                email: data['email'],
                password: passwordOld,
            }, {
                where: {
                    user_id: req.params.id
                }
            }).then(user => {
                res.json(user);
            }).catch((error) => {
                console.log(error);
                returnJsonError(res, 400, 'Update user failed');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },

    //Delete user by id
    delete: function (req, res) {
        sequelize.sync().then(function () {
            UserEntity.destroy({
                where: {
                    user_id: req.params.id
                }
            }).then(user => {
                res.json(user);
            }).catch(error => {
                console.log(error);
                returnJsonError(res, 400, 'Delete user failed');
            });

        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },

    //Change password
    changePassword: function (req, res) {
        sequelize.sync().then(async function () {
            let passwordHashOnDB = await UserEntity.findByPk(req.params.id).then(user => {
                return user['password'];
            }).catch(error => {
                returnJsonError(res, 400, 'Change password user failed');
            });

            let check = await checkPassword(req.body['password_old'], passwordHashOnDB);
            if (!check) {
                returnJsonError(res, 400, 'Old password is incorrect');
            } else {
                let newPassword = req.body['new_password'];
                let confirmNewPassword = req.body['confirm_new_password'];
                if (newPassword === confirmNewPassword) {
                    newPassword = await hasPasword(newPassword);
                    await UserEntity.update({
                        password: newPassword,
                    }, {
                        where: {
                            user_id: req.params.id
                        }
                    }).then(user => {
                        res.json(user);
                    }).catch((error) => {
                        console.log(error);
                        returnJsonError(res, 400, 'Change password user failed2');
                    });
                } else {
                    returnJsonError(res, 400, 'Confirm password does not match');
                }
            }
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    }
};
