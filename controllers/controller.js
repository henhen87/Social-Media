var express = require('express');

var bodyParser = require('body-parser')

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/friend-book');
});

router.get('/friend-book/search', function(req, res){
		
	res.render('search', null);
});



router.get('/friend-book', function(req, res){

		
	res.render('home', null);

	

});

router.get('/friend-book/newsfeed', function(req, res){

		
	res.render('newsfeed', null);

	

});

router.post('/friend-book/home', function(req, res){
	console.log(req.body.post)

db.events.create({
	userId: req.session.user.id,
    body: req.body.post
  })
    // pass the result of our call
  .then(function(post) {
      // log the result to our terminal/bash window
    console.log(post);
      // redirect
    res.end();
  });
		
	
});

router.get('/friend-book/searchall', function(req, res){

db.users.findAll({
    name: req.body
  })
    // pass the result of our call
  .then(function(post) {
      // log the result to our terminal/bash window
    console.log(post);
      // redirect
    res.render('searchall', {usersFound: data})
  });
		
	
});

router.get('/friend-book/all', function(req, res){

db.events.findAll({
    body: req.body.post
  })
    // pass the result of our call
  .then(function(post) {
      // log the result to our terminal/bash window
    console.log(post);
      // redirect
    res.send(post)
  });
		
	
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
	db.users.findAll({
		where: {
			id: req.session.user.id
		},
		include: [{
			model: db.users, as: 'Friend' //find all users associated as friends
		}, {
			model: db.users, as: 'Sender'
		}]
	}).then(function(dbData) {
		var hbsObject = {
			userInfo: req.session.user,
			userFriend: dbData[0].Friend,
			userMsg: dbData[0].Sender
		}
			console.log(dbData);

		//res.json(hbsObject);
		res.render('profile', hbsObject);
	});
});

router.post('/friend-book/profile', function(req, res){
	db.users.findAll({
		where: {
			id: req.body.profileID
		},
		include: [{
			model: db.users, as: 'Friend' //find all users associated as friends
		}, {
			model: db.users, as: 'Sender'
		}]

	}).then(function(data){
		console.log("profile data", data);

		var userData = {
			id: data[0].id,
			name: data[0].name,
			username: data[0].username,
			email: data[0].email,
			description: data[0].description
		};

		var userObj = {
			userInfo: userData,
			userFriend: data[0].Friend,
			userMsg: data[0].Sender
		}
		
		res.render('profile', userObj);
		
	});
});

router.get('/friend-book/login', function(req, res){
	var messages = {
		success: req.flash('success_msg')
	}
	res.render('login', messages /*{messages: req.flash('success_msg')} //Alternate */);
});

router.get('/friend-book/register', function(req, res){
	res.render('register', {existsMsg: req.flash('Exists')});
});

// router.get('/friend-book/search/results', function(req, res){
// 	res.render('searchedUser');
// });

router.post('/friend-book/search/user', function(req, res){
	console.log('req.body', req.body);
	db.users.findAll({
		where: {
			name: req.body.name
		}
	}).then(function(data){
		var userResults = {
			people: data
		}
		res.render('searchedUser', userResults);
		// res.json()
	});
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

	//Alternate method

   	  // req.checkBody({

  //       'username': {
  //           notEmpty: true,
  //           errorMessage: 'Username is required'
  //       },

  //       'email': {
  //           notEmpty: true,
  //           isEmail: {
  //               errorMessage: 'Invalid Email Address'
  //           },
  //           errorMessage: 'Email is required'
  //       },

  //       'password': {
  //           notEmpty: true,
  //           errorMessage: 'Password is required'
  //       },

  //       'password_confirmation': {
  //           notEmpty: true,
  //           errorMessage: 'Password Confirmation is required'
  //       }

	var errors = req.validationErrors();

	//If there are errors, render the errors
	if(errors){
		res.render('register', {
			errors: errors
		});
	}else{
	//if no errors, create user in database then render user data onto profile page.

		db.users.findOne({
			where: {
				username: username
			}
		}).then(function(data){
			if(data){
				req.flash('Exists', 'Username already exists. Choose another.');
				res.redirect('/friend-book/register');
			}else{

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

					req.flash('success_msg', 'Success! Welcome to Book Face!');

					// res.render("profile", req.session.user);
					res.redirect('/friend-book/login')

				});
			}
		})
	}
//***************************************************************************************************
});



router.post('/friend-book/login',
  passport.authenticate('local', 
  	{ 
  		successRedirect: '/friend-book',
        failureRedirect: '/friend-book/login',
        failureFlash: 'Invalid username and password. Self destructing in 5 seconds!',
        successFlash: 'You have successfully logged in. Welcome to Book Face!' 
    })
  );

router.get('/friend-book/logout', function(req, res){
	req.logOut();
	console.log('req.session in get method', req.session);
	console.log('req.session.user in get method', req.session.user);
	req.session.destroy(function(err){
		res.redirect('/friend-book/login');
		
	});
});


module.exports = router;


