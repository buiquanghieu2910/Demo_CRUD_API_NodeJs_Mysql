'use strict';
const Router = require('express-group-router');
let router = new Router();

const adminMiddleware = (req, res, next) => {
    console.log('admin');
    next();
}

const UserController = require('../Controllers/UserController');

router.group('/user', [adminMiddleware], (router) => {
    router.get('/', UserController.findAllUser);
    router.get('/fake-data', UserController.fakeData);
});

module.exports = router.init();

