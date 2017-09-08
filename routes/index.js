var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var app = express();
var morgan = require('morgan');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

// Get Users
router.get('/users/users', ensureAuthenticated, function(req, res){
	res.render('index');
});

// Get Payments
router.get('/payments/payments', ensureAuthenticated, function(req, res){
	res.render('index');
});

// use morgan to log requests to the console
app.use(morgan('dev'));

function ensureAuthenticated(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // // return an error
    // return res.status(403).send({
    //     success: false,
    //     message: 'No token provided.'
		// });
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
  }
}

// Login. Create token
//---User.password doesn't work-----
// var email1='mark.jakson@mail.com';
// var pass='123456';
router.post('/users/login',	function(req, res) {

	// find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

  if (err) throw err;

	console.log('User is', user);
	var password = req.body.password;

	if (!user) {
		res.json({ success: false, message: 'Authentication failed. User is not found.' });
	} else if (user = req.body.email) {

		//check password
		User.comparePassword(password, user.password, function(err, isMatch) {
		// if(err) throw err;
		if (isMatch) {
			// if user is found and password is right
			// create a token
			var token = jwt.sign(user, app.get('superSecret'), {
			expiresIn : 60*60*1 // expires in 1 hour
		  })

			// return the information including token as JSON
			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});

		} else {
				res.json({ success: false, message: '!!!Authentication failed. Wrong password.'
	});
		}
	})
}
});
});

module.exports = router;
