'use strict';

var _ = require('lodash');
var Reserva = require('./reserva.model');
var User = require('../user/user.model')
var Utils = require('../../components/utils')
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
  return res.json(422, err);
};

function findById(req) {
  return Reserva.findById(req.params.id)
}

// Retorna todas as reservas
exports.index = function(req, res) {
  var query =  Reserva.find()
  query.exec(function(err, reservas) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, reservas);
  });
};

// Retorna uma reserva
exports.show = function(req, res) {
  findById(req).exec(function (err, reserva) {
    if(err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    return res.json(reserva);
  });
};

// Atualiza uma reserva no BD
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, reserva) {
    if (err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    var updated = _.merge(reserva, req.body);
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, reserva);
    });
  });
};

// Deleta uma reserva do BD
exports.destroy = function(req, res) {
  findById(req).exec(function (err, reserva) {
    if(err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    reserva.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Cria uma reserva no BD
exports.create = function(req, res) {
  Reserva.create(req.body, function(err, reserva) {
    if(err) {  
      return validationError(res, err); }
    reserva.owner = req.user
    reserva.save(function(err, reserva) {
       if (err) return validationError(err);
    })
    return res.json(201, reserva);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}