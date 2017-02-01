var express = require('express');

var bodyParser = require('body-parser')

var passport = require('passport');

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/friend-book');
});

router.get('/friend-book', function(req, res){
		
	res.render('home', null);
});

router.get('/friend-book/personresults/:name', function(req, res){

	var name = req.params.name;
	console.log('name',name)
	db.users.findAll({
	    where:{
	        name: name
       	}
	}).then(function(data){
		console.log(data)
	    res.render('personresults', {usersFound: data})

	});	
});




router.get('/friend-book/profile', function(req, res){
	res.render('profile');
});

router.get('/friend-book/login', function(req, res){
	res.render('login');
});

router.get('/friend-book/register', function(res, res){
	res.render('register');
});

router.post('/friend-book/register', function(req, res){

	console.log(req.body);

	db.users.create(req.body).then(function(data){
		console.log("register data", data);
		// res.json(data);
		res.render()
	});

});


router.post('/friend-book/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/friend-book/login',
                                   failureFlash: true })
);


module.exports = router;

