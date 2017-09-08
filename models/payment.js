var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Payment Schema
var PaymentSchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	sum: {
		type: String
	},
	date: {
		type: Date
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('Payment', PaymentSchema);

module.exports.createPayment = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getPaymentByPaymentId = function(title, callback){
	var query = {title: title};
	Payment.findOne(query, callback);
}

module.exports.getPaymentById = function(id, callback){
	Payment.findById(id, callback);
}
