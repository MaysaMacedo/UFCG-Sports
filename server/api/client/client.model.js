'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validate = require('mongoose-validate')

var ClientSchema = new Schema({
  nome: String,
 // phone: { type: String, required: true},
 // address: { type: String, required: true},
 // city: { type: String, required: true},
 // info: String,
  email: { type: String, lowercase: true, required: true, validate: [validate.email, 'Invalid email address'] },
  data: Date,
//owner: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  active: Boolean
});

ClientSchema.statics.filters = function(){
	return {
		nome: 'contains',
		//address: 'contains',
		//city: 'contains',
		//info: 'contains',
		email: 'contains',
		data: 'contains'
	}
}

module.exports = mongoose.model('Client', ClientSchema);