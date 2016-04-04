'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var validate = require('mongoose-validate')
var crypto = require('crypto');

var AppSchema = new Schema({
	name: { type: String, required: true},
	user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	apikey: String
})

var validatePresenceOf = function(value) {
	  return value && value.length;
	};

/**
 * Pre-save hook
 */
AppSchema.pre('save', function(next) {
	// MASTER APPLICATION
	if(this.apikey == '003d8ed40432044e7394131e09f8ad9fc57cd55d') {
		return next()
	}
	var current_date = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	var newkey = crypto.createHash('sha1').update(current_date + random)
			.digest('hex');

	this.apikey = newkey
	
	if(!validatePresenceOf(this.apikey)) {
		next(new Error('Invalid API Key'));
	} else {
		next();
	}
});

module.exports = mongoose.model('App', AppSchema);