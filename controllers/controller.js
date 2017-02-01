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

		// db.users.findOne({
		// 	where: {
		// 		username: req.body.username,
		// 		email: req.body.email
		// 	}
		// }).then(function(data){
		// 	if(data){

		// 	}else{

		// 	}
		// })
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
//***************************************************************************************************
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ 
    	where: {
    		username: username
    	}
    }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/friend-book/login',
  passport.authenticate('local', 
  	{ 
  		successRedirect: '/',
        failureRedirect: '/friend-book/login',
        failureFlash: true 
    }),function(req, res){
  		// res.redirect('/friend-book');
  		res.redirect('/friend-book/profile' + req.user.username);
  }
);

// app.post('/friend-book/register',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;


