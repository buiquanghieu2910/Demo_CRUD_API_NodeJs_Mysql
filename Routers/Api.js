'use strict';
const Router = require('express-group-router');
const jwt = require('jsonWebToken');
let router = new Router();
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');

const config = require('../Utils/Config')

const authMiddleware = (req, res, next) => {
    var token = req.headers['accept-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        next();
    });
}

const guestMiddleware = (req, res, next) => {
    next();
}

router.group('/', [guestMiddleware], (router) => {
    router.post('/login', AuthController.login);
    router.post('/user-register', UserController.store);
    router.get('/logout', AuthController.logout);

})


router.group('/user', [authMiddleware], (router) => {
    router.get('/fake-data', UserController.fakeData)
    router.post('/', UserController.store);
    router.get('/', UserController.findAllUser);
    router.get('/:id', UserController.findById);
    router.put('/:id', UserController.update);
    router.delete('/:id', UserController.delete);
    router.put('/change-password/:id', UserController.changePassword);
});

module.exports = router.init();

