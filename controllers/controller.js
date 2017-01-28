var express = require('express');

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/ebert');
});

router.get('/ebert', function(req, res){
	res.render('movies', null);
});

router.get('/profile/:id', function(req, res){

});

module.exports = router;