var express = require('express');

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/friend-book');
});

router.get('/friend-book', function(req, res){
	res.render('home', null);
});

router.get('/friend-book/profile', function(req, res){
	res.render('profile');
});

router.get('/friend-book/register', function(res, res){
	res.render('register');
});

router.post('/friend-book/register', function(req, res){
	console.log(req.body);
	db.users.create(req.body).then(function(data){
		res.json(data);
	});
});

module.exports = router;