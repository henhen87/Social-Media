var express = require('express');
var bodyParser = require('body-parser')

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


// router.post('/friend-book/search', function(req, res){
// 	console.log(req.body.name);

// 	db.users.findAll({
// 	    where:{
// 	        name: req.body.name
//        	}
// 	}).then(function(data){
// 		console.log(data)
// 	    res.json(data)

// 	});
	
// });

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

