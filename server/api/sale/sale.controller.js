'use strict';

var _ = require('lodash');
var Sale = require('./sale.model');
var auth = require('../../auth/auth.service');
var Utils = require('../../components/utils');

var validationError = function(res, err) {
  return res.json(422, err);
};

function findById(req) {
	var query =  Sale.findById(req.params.id).where('owner').equals(req.user)
	  if(auth.isAdmin(req.user)) {
		  query = Sale.findById(req.params.id)
	  }
	return query
}

// Get list of sales
exports.index = function(req, res) {
	var query =  Sale.find({'owner': req.user})
    Utils.applyFilters(query, Sale.filters(), req.query)
    if(auth.isAdmin(req.user)) {
	  query = Sale.find()
    }
	query.exec(function (err, sales) {
    if(err) { return handleError(res, err); }
    return res.json(200, sales);
  });
};

// Get a single sale
exports.show = function(req, res) {
  findById(req).exec(function (err, sale) {
    if(err) { return handleError(res, err); }
    if(!sale) { return res.send(404); }
    return res.json(sale);
  });
};

// Creates a new sale in the DB.
exports.create = function(req, res) {
  Sale.create(req.body, function(err, sale) {
    if(err) { return validationError(res, err); }
    sale.owner = req.user;
    sale.save(function(err, sale) {
    	 if (err) return validationError(err);
    })
    return res.json(201, sale);
  });
};

// Updates an existing sale in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, sale) {
    if (err) { return handleError(res, err); }
    if(!sale) { return res.send(404); }
    var updated = _.merge(sale, req.body);
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, sale);
    });
  });
};

// Deletes a sale from the DB.
exports.destroy = function(req, res) {
  findById(req).exec(function (err, sale) {
    if(err) { return handleError(res, err); }
    if(!sale) { return res.send(404); }
    sale.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}