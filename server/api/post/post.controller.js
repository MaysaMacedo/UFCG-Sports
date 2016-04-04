'use strict';

var _ = require('lodash');
var Utils = require('../../components/utils')
var Post = require('./post.model');
var Realty = require('../realty/realty.model');
var auth = require('../../auth/auth.service');

var validationError = function(res, err) {
	  return res.json(422, err);
};

function findById(req) {
	var query = Post.findById(req.params.id).where('owner').equals(req.user)
	if (auth.isAdmin(req.user)) {
		query = Post.findById(req.params.id)
	}
	return query
}

// Get list of posts
exports.index = function(req, res) {
	var query = Post.find()
	Utils.applyFilters(query, Post.filters(), req.query)
	query.exec(function(err, posts) {
		var result = {
				"results": posts
		}
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, result);
	});
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Realty.findById(req.body.realty, function(err, realty) {
	  req.body.realty = realty
	  if(realty.frontImage != undefined) {
	    	 realty.frontImage = new Buffer(realty.frontImage, "base64");
	    }
	  Post.create(req.body, function(err, post) {
		  if(err) { return validationError(res, err); }
		  post.owner = req.user;
		  post.save(function(err, post) {
			  if (err) return validationError(err);
		  })
		  return res.json(201, post);
	  });
  })
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  findById(req).exec(function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    Realty.findById(req.body.realty, function(err, realty) {
  	  req.body.realty = realty
  	  var updated = _.merge(post, req.body);
  	  updated.save(function (err) {
  		  if (err) { return validationError(res, err); }
  		  return res.json(200, post);
  	  });
    })
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
	findById(req).exec(function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.createComment = function(req, res) {
	Post.findById(req.params.id, function (err, post) {
		if (err) {
			return handleError(res, err);
		}
		if (!post) {
			return res.send(404);
		}
		var body = req.body
		var comment = {
				name: body.name,
				email: body.email,
				comment: body.comment,
				createdAt: new Date().toJSON()
		}
		post.addComment(comment)
		post.save(function(err) 
				{
			if(err) { return handleError(res, err); }
			return res.send(204)
		})
	});
}

exports.showComments = function(req, res) {
	Post.findById(req.params.id, function (err, post) {
		if (err) {
			return handleError(res, err);
		}
		if (!post) {
			return res.send(404);
		}
		return res.send(post.comments)
	});
}

exports.deleteComment = function(req, res) {
	Post.findById(req.params.id, function (err, post) {
		if (err) {
			return handleError(res, err);
		}
		if (!post) {
			return res.send(404);
		}
		post.comments.id(req.params.commentId).remove()
		post.save(function(err) {
			if(err) { return handleError(res,err);}
			return res.send(200)
		})
	});
}

function handleError(res, err) {
  return res.send(500, err);
}