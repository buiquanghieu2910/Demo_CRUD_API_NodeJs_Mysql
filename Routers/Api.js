'use strict';
const Router = require('express-group-router');
let router = new Router();

const authMiddleware = (req, res, next) => {
    console.log('admin');
    next();
}

const UserController = require('../Controllers/UserController');

router.group('/user', [authMiddleware], (router) => {
    router.get('/fake-data', UserController.fakeData) //Fake 1 record;
    router.post('/', UserController.store); //Get user by id
    router.get('/', UserController.findAllUser); //Get all users
    router.get('/:id', UserController.findById); //Get user by id
    router.put('/:id', UserController.update); //Update user by id
    router.delete('/:id', UserController.delete); //Update user by id
    router.put('/change-password/:id', UserController.changePassword); //Change password user by id
});

module.exports = router.init();

