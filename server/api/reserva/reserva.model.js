'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var validate = require('mongoose-validate')

var ReservaSchema = new Schema({
  nome: { type: String, required: true},
  email: { type: String, required: true},
  data: { type: Date, required: true},
  recurso: { type: Number, required: true},
  hora: { type: Number, required: true}
});

ReservaSchema.statics.filters = function(){
	return {
		nome: 'contains',
		email: 'contains',
		data: 'contains'
	}
}

module.exports = mongoose.model('Reserva', ReservaSchema);