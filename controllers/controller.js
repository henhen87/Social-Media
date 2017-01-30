var express = require('express');

var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	//res.redirect('/friend-book');
	res.redirect('/friends_demo?id=1');
});

router.get('/friend-book', function(req, res){
	res.render('home', null);
});




router.get("/friends_demo/:id?", function(req, res){

	db.Users.findAll({
		where: {
			id: {
				$ne: req.query.id
			}
		}
	}).then(function(dbUsers) {
    	var hbsObject = {
			Users: dbUsers
		};
      	console.log(hbsObject);
    	res.render("friends_demo", hbsObject);
    });

});

/*
 app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
*/

router.post("/friends_demo/:id?", function(req, res) {
	console.log('req.body.FriendID', req.body.FriendID);
	console.log('req.query.id', req.query.id);
	db.Friends.create({
		userID: req.query.id,
		friendID: req.body.FriendID
	}).then(function(dbFriends) {
		res.json(dbFriends);
	})
});

router.get('/friend-book/profile', function(req, res){
	res.render('profile');
});

router.get('/friend-book/register', function(res, res){
	res.render('register');
});

router.post('/friend-book/register', function(req, res){
	console.log(req.body);
	db.user.create(req.body).then(function(data){
		res.json(data);
	});
});

module.exports = router;