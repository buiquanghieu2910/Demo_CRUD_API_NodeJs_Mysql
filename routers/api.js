'use strict';
const Router = require('express-group-router');
let router = new Router();

const fooMiddleware = (req, res, next) => {
    console.log('foo');
    next();
}

const barMiddleware = (req, res, next) => {
    console.log('bar');
    next();
}

var testController = require('../controllers/TestController');
router.get('/hello', (req, res) => {
    res.send('Hello world');
})

router.group('/foo', [fooMiddleware], (router) => {
    router.get('/a', (req, res) => {
        res.send('Foo');
    });

    router.group('/bar', [barMiddleware], (router) => {
        router.get('/test', testController.store)
    })
});

module.exports = router.init();

