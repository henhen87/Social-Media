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

		sess = req.session.user;

		//res.json(data);
//		res.render("profile", req.session.user);

	});

	//console.log("trying redirect");
	res.json({ url: "/friend-book/profile", session: req.session.user });

//	res.redirect("/friend-book/profile");
});



router.post('/friend-book/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/friend-book/login',
                                   failureFlash: true })
);

// app.post('/friend-book/register',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;


