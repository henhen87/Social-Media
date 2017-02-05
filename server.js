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
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require("express-validator");
var flash = require("connect-flash");

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



// Static directory
app.use(express.static("./public"));

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ 
    	where: {
    		username: username
    	}
    

      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
    }).then(function(user){
    	// if(err) {return done(err);}
    	if (!user) {
        	return done(null, false, { message: 'Incorrect username.' });
      	}
      	//Instance methods can only be used when certain instances of sequelized are used such as create. Not
		//all instances of sequelize can use instance methods.
    	user.passwordVerify(password, user.password, function(err, match){
    		console.log('\n\n')
    		console.log("err was", err);
    		console.log('\n\n')
    		console.log("match was", match);

    		if (err) {
    			done(err);
    		}

    		if (match) {
    			return done(null, user);
    		} else {
    			return done(null, false, {message: 'Invalid Password'});
    		}
    	});
    }).catch(function(err){
    	console.log('failed on passport authentication', err);
    	done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("user in serializeUser", user);
  console.log("HEEEYYYYYYYY");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log("id in serializeUser", id);
  console.log("deserializeUserHIIIIIIIIIIII");
  //This was not working because I was not using sequelize syntax and just using the passport js document. I had to put
  //the function that I pasted from document, inside the 'then' promise that is part of sequelize syntax.
  // db.users.findById(id).then(function(user) {
  	console.log('deserializeUseruser', user)
    done(null, user);
  // }).catch(function(err){
  	// done(err);
  // });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());



app.use(function(req, res, next){
	//res.locals has global scope.
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	//This had to be req.user instead of req.session, since user is what gets returns from the passport
	//deserialize function.
	res.locals.guy = req.user || null;
	
  if (req.user) {
    req.session.user = {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      description: req.user.description,
      img: req.user.img
    };
  }

  	console.log('SUCCES MESSAGE', res.locals.succes_msg);
	console.log('locals user', res.locals.user);
	console.log('session one', req.session);
	console.log('session user', req.session.user);
	console.log('req.user', req.user);
	next(); //Needed to call the next here to call the next app.use middleware. Before
	//I didnt have this, the app.use('/', routes) was never getting executed since the next() was not being 
	//called.
});

var routes = require('./controllers/controller.js');
app.use('/', routes);


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes =============================================================



// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});