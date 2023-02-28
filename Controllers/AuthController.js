'use strict'
const sequelize = require('../Repositories/Connect_db');
const UserEntity = require('../Entities/UserEntity');
const { hasPasword, checkPassword } = require('../Utils/Bcrypt');
const { v4: uuidv4 } = require('uuid');
const { returnJsonError } = require('../Utils/Common');
const config = require('../Utils/Config');
const jwt = require('jsonwebtoken');

module.exports = {
    //Login
    login: function (req, res) {
        sequelize.sync().then(function () {
            UserEntity.findOne(
                {
                    where: {
                        email: req.body.email
                    }
                }
            ).then(user => {
                if (!user) return res.status(400).send({ message: 'Email or password is incorrect' });

                var passwordIsValid = checkPassword(req.body.password, user.password);
                if (!passwordIsValid) return res.status(400).send({ message: 'Email or password is incorrect' });

                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: config.expiresIn 
                });

                res.status(200).send({ auth: true, token: token });
            }).catch(error => {
                console.log(error);
                returnJsonError(res, 400, 'Get user failed');
            });
        }).catch((error) => {
            console.log(error);
            returnJsonError(res, 400, 'Connect database failed');
        });
    },
    
    //Logout
    logout:function(req, res){
        res.status(200).send({ auth: false, token: null });
    }
};