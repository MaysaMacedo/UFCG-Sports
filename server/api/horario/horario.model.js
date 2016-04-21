'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validate = require('mongoose-validate')

var HorarioSchema = new Schema({
    nome: String,
    active: Boolean
});

HorarioSchema.statics.filters = function() {
    return {
        nome: 'contains'
    }
}

module.exports = mongoose.model('Horario', HorarioSchema);
