var sess;


var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/friend-book');
});

router.get('/friend-book', function(req, res){
	res.render('home', null);
});

router.get('/friend-book/profile', function(req, res){
	console.log("trying redirect", sess);

	res.render('profile', sess);
});

router.get('/friend-book/login', function(req, res){
	res.render('login');
});

router.get('/friend-book/register', function(res, res){
	res.render('register');
});

router.post('/friend-book/register', function(req, res){

	console.log(req.body);

	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var description = req.body.description

	//Using express validator*************************************************************************

	req.checkBody('name', 'Must type in name.').notEmpty();
	req.checkBody('username', 'Must type in Username.').notEmpty();
	req.checkBody('email', 'Must type in email.').notEmpty();
	req.checkBody('email', 'Invalid Email').isEmail();
	req.checkBody('password', 'Must type in password.').notEmpty();
	req.checkBody('password2', 'Passwords do not match.').equals(req.body.password);
	req.checkBody('description', 'Must type in something about yourself.').notEmpty();

	var errors = req.validationErrors();

	//If there are errors, render the errors
	if(errors){
		res.render('register', {
			errors: errors
		});
	}else{
	//if no errors, create user in database then render user data onto profile page.
		db.users.create(req.body).then(function(data){
			console.log("register data", data);
			
			console.log("poop", data.id);
			req.session.user = {
				id: data.id,
				name: data.name,
				username: data.username,
				email: data.email,
				description: data.description
			};

			res.render("profile", req.session.user);

		});
	}
//***************************************************************************************************
});



// router.post('/friend-book/login',
//   // passport.authenticate('local', { successRedirect: '/',
//   //                                  failureRedirect: '/friend-book/login',
//   //                                  failureFlash: true })
// );

// app.post('/friend-book/register',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;


