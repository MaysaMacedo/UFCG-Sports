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
  var t0 = new Date().getTime();

    findById(req).exec(function(err, Recurso) {
        if (err) {
            return handleError(res, err);
        }
        if (!Recurso) {
            return res.send(404);
        }
        var t1 = new Date().getTime() - t0;
        console.log("Call to doSomething took " + (t1) + " milliseconds.");
        Recurso['dbTime'].push(t1);
        return res.json(Recurso)
    });
};

// Creates a new Recurso in the DB.
exports.create = function(req, res) {
  var t0 = new Date().getTime();

    Recurso.create(req.body, function(err, Recurso) {
        if (err) {
          console.log(err.message);
            return validationError(res, err);
        }
        Recurso.save(function(err, Recurso) {
          var t1 = new Date().getTime() - t0;
          Recurso['dbTime'].push(t1)

          console.log("Call to doSomething took " + (t1) + " milliseconds.")
          if (err) return validationError(err);
          return res.status(201).json(Recurso);
        })
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
        updated.horariosDisponiveis = _.map(req.body.horariosDisponiveis, _.clone);
        updated.markModified('horariosDisponiveis'); // Avisa ao mongoose que o array mudou.
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
