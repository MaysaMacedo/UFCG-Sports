'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var validate = require('mongoose-validate')

var SaleSchema = new Schema({ 
  commission: { type: Number, required: true},
  owner: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  realty: [{ type: Schema.Types.ObjectId, ref: 'Realty'}],
  client: [{ type: Schema.Types.ObjectId, ref: 'Client'}],
  price: { type: Number, required: true},
  state: { type: String}
});

SaleSchema.statics.filters = function(){
	return {
		commission: 'lessThenEquals',
		price: 'lessThenEquals',
		state: 'contains'
	}
}

//Validation
SaleSchema.path('realty').validate(function(realty) {
	if (realty.length === 0)
		return false
	return realty.length;
}, 'Realty cannot be blank');

SaleSchema.path('client').validate(function(client) {
	if (client.length === 0)
		return false
	return client.length;
}, 'Client cannot be blank');

module.exports = mongoose.model('Sale', SaleSchema);