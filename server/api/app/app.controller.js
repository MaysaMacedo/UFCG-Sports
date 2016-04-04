'use strict';

var _ = require('lodash');
var App = require('./app.model');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
	  return res.json(422, err);
	};

function findById(req) {
	var query =  App.findById(req.params.id).where('user').equals(req.user)
	  if(auth.isAdmin(req.user)) {
		  query = App.findById(req.params.id)
	  }
	return query
}

// Get list of apps
exports.index = function(req, res) {
	var query = App.find({'user' : req.user})
	if (auth.isAdmin(req.user)) { 
		query = App.find() 
	}
	query.exec(function(err, apps) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, apps);
	});
};

// Get a single app
exports.show = function(req, res) {
  findById(req).exec(function (err, app) {
    if(err) { return handleError(res, err); }
    if(!app) { return res.send(404); }
    return res.json(app);
  });
};

// Creates a new app in the DB.
exports.create = function(req, res) {
	var app = new App(req.body)
	return User.findOne(req.user._id, function(err, user) {
			app.user = user._id
			app.save(function(err, app) {
				if (err) {
					return validationError(res, err);
				}
				return res.json(201, app);

			});
		})
};

// Updates an existing app in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.apikey) { delete req.body.apikey; }
  findById(req).exec(function (err, app) {
    if (err) { return handleError(res, err); }
    if(!app) { return res.send(404); }
    var updated = _.merge(app, req.body);
    updated.save(function (err) {
      if (err) { return validationError(res, err); }
      return res.json(200, app);
    });
  });
};

// Deletes a app from the DB.
exports.destroy = function(req, res) {
  findById(req).exec(function (err, app) {
    if(err) { return handleError(res, err); }
    if(!app) { return res.send(404); }
    app.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}