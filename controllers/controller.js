var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	res.redirect('/ebert');
});

router.get('/ebert', function(req, res){
	res.render('home', null);
});

router.post('/usersearch', function(req, res){
	db.users.findAll({
    where:{
        name: req.body.name
        }
}).then(function(data){
    res.json(data)
    });
});

module.exports = router;

