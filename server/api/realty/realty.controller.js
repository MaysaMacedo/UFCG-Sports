'use strict';

var _ = require('lodash');
var Realty = require('./realty.model');
var Utils = require('../../components/utils')
var auth = require('../../auth/auth.service');
var mongoose = require('mongoose');

var validationError = function(res, err) {
  return res.json(422, err);
};

function findById(req) {
	var query =  Realty.findById(req.params.id).where('owner').equals(req.user)
	  if(auth.isAdmin(req.user)) {
		  query = Realty.findById(req.params.id)
	  }
	return query
}

// Get list of realtys
exports.index = function(req, res) {
    var query =  Realty.find({'owner': req.user})
    Utils.applyFilters(query, Realty.filters(), req.query)
    if(auth.isAdmin(req.user)) {
	  query = Realty.find()
    }
	query.exec(function(err, realtys) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, realtys);
	});
};

// Get a single realty
exports.show = function(req, res) {
  findById(req).exec(function (err, realty) {
    if(err) { return handleError(res, err); }
    if(!realty) { return res.send(404); }
    if(realty.frontImage != undefined) {
    	 realty.frontImage = new Buffer(realty.frontImage, "base64");
    }
    return res.json(realty);
  });
};

// Creates a new realty in the DB.
exports.create = function(req, res) {
  if(req.body.frontImage != undefined) {
	  req.body.frontImage = new Buffer(req.body.frontImage).toString('base64');
  }
  Realty.create(req.body, function(err, realty) {
    if(err) { return validationError(res, err); }
    realty.owner = req.user;
    realty.save(function(err, realty) {
    	 if (err) return validationError(err);
    })
    return res.json(201, realty);
  });
};

// Updates an existing realty in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, realty) {
    if (err) { return handleError(res, err); }
    if(!realty) { return res.send(404); }
    var updated = _.merge(realty, req.body);
    if(realty.frontImage != undefined) {
    	realty.frontImage = new Buffer(realty.frontImage).toString('base64');
    }
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, realty);
    });
  });
};

// Deletes a realty from the DB.
exports.destroy = function(req, res) {
  findById(req).exec(function (err, realty) {
    if(err) { return handleError(res, err); }
    if(!realty) { return res.send(404); }
    realty.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}