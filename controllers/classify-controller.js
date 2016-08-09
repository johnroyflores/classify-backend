var express = require('express');
var models = require('../models');
var router = express.Router();
var loginController = require('./login-controller.js');



loginController(router, models);

router.get('/', function(req, res) {
    res.redirect('/classify');
});

router.get('/classify', function(req, res) {
    //
});

router.get('/squad', function(req, res) {
	// res.render('/squad');
})
console.log('Main router loaded.');
module.exports = router;