// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require('passport');
var expressValidator = require("express-validator");
var flash = require("connect-flash");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({
	secret: "duuuuuuuuuDE",
	resave: false,
	saveUninitialized: true
}));

//Loading express validator to check for proper registration values in input boxes***********************

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//********************************************************************************************************

app.use(flash());

app.use(function(req, res, next){
	//res.locals has global scope.
	res.locals.succes_msg = req.flash('succes_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next(); //Needed to call the next here to call the next app.use middleware. Before
	//I didnt have this, the app.use('/', routes) was never getting executed since the next() was not being 
	//called.
});


// Static directory
app.use(express.static("./public"));


app.use(passport.initialize());
app.use(passport.session());

var routes = require('./controllers/controller.js');
app.use('/', routes);

app.use(function (req, res, next) {

	var user = req.session.user;
	
	if (!user) {
		user = req.session.user = {};
	}
	
	res.sendStatus(200);
});




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