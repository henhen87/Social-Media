var sess;

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/friend-book');
});

router.get('/friend-book', function(req, res){
	res.render('home');
});

router.get('/friend-book/profile', function(req, res){

	res.render('profile');
});

router.get('/friend-book/login', function(req, res){
	res.render('login');
});

router.get('/friend-book/register', function(req, res){
	res.render('register');
});

router.get('/friend-book/test', function(req, res){
	db.Users.findAll({
		where: {
			id: req.session.user.id
		},
		include: [{
			model: db.Users, as: 'Friend' //find all users associated as friends
		}]
	}).then(function(dbData) {
		var hbsObject = {
			userInfo: req.session.user,
			friendInfo: dbData,
			userFriend: dbData[0].Friend
		}
		//console.log("THIS IS DBDATA", dbData);
		//console.log("THIS IS DBDATA.Friends", dbData.Friends);
		//res.render('test', hbsObject);
		//res.json(dbData);
		console.log(dbData.Friend);
		console.log("MY SELF", hbsObject.userInfo);
		console.log("MY FRIENDS", hbsObject.friendInfo);
		console.log("MY USERFRIEND", hbsObject.userFriend);
		//res.json(hbsObject);
		res.render('test', hbsObject);

	});
});

router.post('/friend-book/search/user', function(req, res){
	db.users.findAll({
		where: {
			name: req.body.name
		}
	}).then(function(data){
		var userResults = {
			people: data
		}
		res.render('searchedUser', userResults);
	})
});

router.post('/friend-book/register', function(req, res){

});
/*
User.findAll({
  include: [{
    model: Project,
    through: {
      attributes: ['createdAt', 'startedAt', 'finishedAt'],
      where: {completed: true}
    }
  }]
});
*/



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

			//console.log("poop", data.id);
			db.Users.create(req.body).then(function(data){
				console.log("register data", data);
				
				console.log("poop", data.id);
				req.session.user = {
					id: data.id,
					name: data.name,
					username: data.username,
					email: data.email,
					description: data.description
				};

				req.flash('success_msg', 'Success! Welcome to Book Face!');

				// res.render("profile", req.session.user);
				res.redirect('/friend-book/login')

			});
	}
//***************************************************************************************************
});




router.post('/friend-book/login',
  passport.authenticate('local', 
  	{ 
  		successRedirect: '/friend-book',
        failureRedirect: '/friend-book/login',
        failureFlash: true 
    })
  );

router.get('/friend-book/logout', function(req, res){
	req.logOut();
	console.log('req.session in get method', req.session);
	console.log('req.session.user in get method', req.session.user);
	// req.session.destroy(function(err){
		res.redirect('/friend-book/login');
		
	// });
});

// app.post('/friend-book/register',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;


