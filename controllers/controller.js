var express = require('express');

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/movies');
});

router.get('/ebert', function(req, res){
	//res.render('movies', null);
});

router.get('/movies', function(req, res){
	db.events.findAll({}).then(function(dbEvents) {
    	var hbsObject = {
			events: dbEvents
		};
      	console.log(hbsObject);
    	res.render("movies", hbsObject);
    });
});

router.get('/profile/:id', function(req, res){

});

module.exports = router;