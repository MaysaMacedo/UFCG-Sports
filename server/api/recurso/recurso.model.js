'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validate = require('mongoose-validate')

var RecursoSchema = new Schema({
    nome: { type: String, required: true },
    minPessoas: { type: Number, required: true },
    horariosDisponiveis: [Number],
    active: { type:String, required: false},
    private: { type: String, required: false}
});

RecursoSchema.statics.filters = function() {
    return {
        nome: 'contains'
    }
}

module.exports = mongoose.model('Recurso', RecursoSchema);
