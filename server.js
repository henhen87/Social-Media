
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var db = require("./models");

var routes = require('./controllers/controller.js');

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

app.use(session({
	secret: "duuuuuuuuuuuddde",
	resave: false,
	saveUninitialized: true
}));

app.use(function (req, res, next) {

	var user = req.session.user;
	
	if (!user) {
		user = req.session.user = {};
	}
	
	res.sendStatus(200);
});

app.use(passport.initialize());
app.use(passport.session());

//Passport JS ***********************************************************
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ username: username, password: password }, function (err, user) {
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


app.use('/', routes);





var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes =============================================================



// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});