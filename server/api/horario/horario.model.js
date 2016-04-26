'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validate = require('mongoose-validate')

var HorarioSchema = new Schema({
    usuario: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    recurso: [{ type: Schema.Types.ObjectId, ref: 'Recurso' }],
    descricao: { type: String, required: false },
    data: { type: Date, required: true },
    hora: { type: Number, required: true },
    duracao: { type: Number, required: true },
    semanal: Boolean,
    active: Boolean
});

HorarioSchema.statics.filters = function() {
    return {
        nome: 'contains'
    }
}

module.exports = mongoose.model('Horario', HorarioSchema);
