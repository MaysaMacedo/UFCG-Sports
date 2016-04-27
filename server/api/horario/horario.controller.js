'use strict';

var _ = require('lodash');
var Horario = require('./horario.model');
var Utils = require('../../components/utils');
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
    return res.json(422, err);
};

function findById(req) {
    var query = Horario.findById(req.params.id).where('usuario').equals(req.user);
    if (auth.isAdmin(req.user)) {
        query = Horario.findById(req.params.id);
    }
    return query;
}

// Get list of Horarios
exports.index = function(req, res) {
    var query = Horario.find();
    Utils.applyFilters(query, Horario.filters(), req.query);
    query.exec(function(err, Horarios) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, Horarios);
    });
};

// Get a single Horario
exports.show = function(req, res) {
    findById(req).exec(function(err, Horario) {
        if (err) {
            return handleError(res, err);
        }
        if (!Horario) {
            return res.send(404);
        }
        return res.json(Horario);
    });
};

// Creates a new Horario in the DB.
exports.create = function(req, res) {
    if (auth.isAdmin(req.user)) {
        Horario.create(req.body, function(err, Horario) {
            if (err) {
                return validationError(res, err);
            }
            Horario.usuario = req.user;
            Horario.save(function(err, Horario) {
                if (err) {
                    return validationError(err);
                }
            });
            return res.json(201, Horario);
        });
    } else {
        return res.send(403);
    }
};

// Updates an existing Horario in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    findById(req).exec(function(err, Horario) {
        if (err) {
            return handleError(res, err);
        }
        if (!Horario) {
            return res.send(404);
        }
        var updated = _.merge(Horario, req.body);
        updated.save(function(err) {
            if (err) {
                return validationError(res, err);
            }
            return res.json(200, Horario);
        });
    });
};

// Deletes a Horario from the DB.
exports.destroy = function(req, res) {
    findById(req).exec(function(err, Horario) {
        if (err) {
            return handleError(res, err);
        }
        if (!Horario) {
            return res.send(404);
        }
        Horario.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
