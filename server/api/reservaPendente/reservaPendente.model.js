'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var validate = require('mongoose-validate')

var ReservaPendenteSchema = new Schema({ 
  recurso: { type: Schema.Types.ObjectId, ref: 'Recurso' },
  qtdMinimaPessoas: {type:Number},
  data: { type: Date, required: true},
  hora: { type: Number, required: true},
  nome: { type: String, required: true},
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

ReservaPendenteSchema.statics.filters = function(){
	return {
		nome: 'contains',
		email: 'contains',
		data: 'contains'
	}
}

module.exports = mongoose.model('ReservaPendente', ReservaPendenteSchema);