'use strict';

var _ = require('lodash');
var Client = require('./client.model');
var User = require('../user/user.model')
var Utils = require('../../components/utils')
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
  return res.json(422, err);
};

function findById(req) {
	var query =  Client.findById(req.params.id).where('owner').equals(req.user)
	  if(auth.isAdmin(req.user)) {
		  query = Client.findById(req.params.id)
	  }
	return query
}

// Get list of clients
exports.index = function(req, res) {
  var query =  Client.find({'owner': req.user})
  Utils.applyFilters(query, Client.filters(), req.query)
  if(auth.isAdmin(req.user)) {
	  query = Client.find()
  }
  query.exec(function (err, clients) {
    if(err) { return handleError(res, err); }
    return res.json(200, clients);
  });
};

// Get a single client
exports.show = function(req, res) {
  findById(req).exec(function (err, client) {
    if(err) { return handleError(res, err); }
    if(!client) { return res.send(404); }
    return res.json(client)
  });
};

// Creates a new client in the DB.
exports.create = function(req, res) {
  Client.create(req.body, function(err, client) {
    if(err) {  
    	return validationError(res, err); }
    client.owner = req.user
    client.save(function(err, client) {
    	 if (err) return validationError(err);
    })
    return res.json(201, client);
  });
};

// Updates an existing client in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, client) {
    if (err) { return handleError(res, err); }
    if(!client) { return res.send(404); }
    var updated = _.merge(client, req.body);
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, client);
    });
  });
};

// Deletes a client from the DB.
exports.destroy = function(req, res) {
  findById(req).exec(function (err, client) {
    if(err) { return handleError(res, err); }
    if(!client) { return res.send(404); }
    client.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}