'use strict';

var _ = require('lodash');
var Recurso = require('./recurso.model');
var User = require('../user/user.model')
var Utils = require('../../components/utils')
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
    return res.json(422, err);
};

function findById(req) {
    return Recurso.findById(req.params.id)
}

// Get list of Recursos
exports.index = function(req, res) {
    var query = query = Recurso.find()
    Utils.applyFilters(query, Recurso.filters(), req.query)
    query.exec(function(err, Recursos) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, Recursos);
    });
};

// Get a single Recurso
exports.show = function(req, res) {
    findById(req).exec(function(err, Recurso) {
        if (err) {
            return handleError(res, err);
        }
        if (!Recurso) {
            return res.send(404);
        }
        return res.json(Recurso)
    });
};

// Creates a new Recurso in the DB.
exports.create = function(req, res) {
    Recurso.create(req.body, function(err, Recurso) {
        if (err) {
            return validationError(res, err);
        }
        Recurso.save(function(err, Recurso) {
            if (err) return validationError(err);
        })
        return res.json(201, Recurso);
    });
};

// Updates an existing Recurso in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    findById(req).exec(function(err, Recurso) {
        if (err) {
            return handleError(res, err);
        }
        if (!Recurso) {
            return res.send(404);
        }
        var updated = _.merge(Recurso, req.body);
        updated.save(function(err) {
            if (err) {
                return validationError(res, err);
            }
            return res.json(200, Recurso);
        });
    });
};

// Deletes a Recurso from the DB.
exports.destroy = function(req, res) {
    findById(req).exec(function(err, Recurso) {
        if (err) {
            return handleError(res, err);
        }
        if (!Recurso) {
            return res.send(404);
        }
        Recurso.remove(function(err) {
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
