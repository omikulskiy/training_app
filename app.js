var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var config = require('./config'); // get our config file

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var payments = require('./routes/payments');

// Init App
var app = express();

//----------------------------CODE FROM JWT APP---------------------------------

// =======================
// configuration =========
// =======================
// var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
// mongoose.connect(config.database); // connect to database
// app.set('superSecret', config.secret); // secret variable
// configuration =========

//------------------------------CODE FROM JWT APP-------------------------------

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Set Static Folder for style sheet and images
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validator Middleware
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

// Connect Flash Middleware
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.payment = req.payment || null;
  next();
});

//Middleware for the Routes Files
//It redirects to routes above
app.use('/', routes);
//app.use('/authenticate', )
app.use('/users', users);
app.use('/payments', payments);

// Set Port
app.set('port', (process.env.PORT || 3099));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
