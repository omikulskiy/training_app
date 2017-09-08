var express = require('express');
var router = express.Router();

var Payment = require('../models/payment');

// Route Add Payment
router.get('/payment', function(req, res){
	res.render('payment');
});

// Route List of Payments
router.get('/payments', function(req, res){
	res.render('payments');
});

// Create Payment
router.post('/payment', function(req, res){
	var title = req.body.title;
	var sum = req.body.sum;
	var date = req.body.date;
	var type = req.body.type;

	// Validation
	req.checkBody('title', 'Payment title is required').notEmpty();
	req.checkBody('sum', 'Sum is required').notEmpty();
	req.checkBody('date', 'Date is required').notEmpty();
  req.checkBody('type', 'Type is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('payment',{
			errors:errors
		});
	} else {
		var newPayment = new Payment({
			title: title,
			sum: sum,
			date: date,
			type: type
		});

		Payment.createPayment(newPayment, function(err, payment){
			if(err) throw err;
			console.log(payment);
		});

		req.flash('success_msg', 'Your payment has been added.');

		res.redirect('/payments/payments');
	}

});

module.exports = router;
