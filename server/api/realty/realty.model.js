'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var validate = require('mongoose-validate')

var RealtySchema = new Schema({
  type: { type: String, required: true},
  region: { type: String, required: true},
  city: { type: String, required: true},
  address: { type: String, required: true},  
  holder: { type: String, required: true}, 
  frontImage: String,
  owner: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  active: Boolean
});

RealtySchema.statics.filters = function(){ 
	return {
		type: 'contains',
		region: 'contains',
		city: 'contains',
		address: 'contains'
	}
}

module.exports = mongoose.model('Realty', RealtySchema);