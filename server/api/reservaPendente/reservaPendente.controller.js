'use strict';

var _ = require('lodash');
var ReservaPendente = require('./reservaPendente.model');
var auth = require('../../auth/auth.service');
var Utils = require('../../components/utils');

var validationError = function(res, err) {
  return res.json(422, err);
};

function findById(req) {
  return ReservaPendente.findById(req.params.id)
}

exports.index = function(req, res) {
  var query =  ReservaPendente.find()
  query.exec(function(err, reservasPendentes) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, reservasPendentes);
  });
};

exports.show = function(req, res) {
  findById(req).exec(function (err, reserva) {
    if(err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    return res.json(reserva);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, reserva) {
    if (err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    var updated = _.merge(reserva, req.body);
    updated.users = _.map(req.body.users, _.clone);
    updated.markModified('users'); // Avisa ao mongoose que o array mudou.
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, reserva);
    });
  });
};

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

exports.create = function(req, res) {
  ReservaPendente.create(req.body, function(err, reserva) {
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