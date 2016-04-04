'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('lodash');
var validate  = require('mongoose-validate')
var Realty = require('../realty/realty.model')

var CommentSchema = new Schema({
	name: {type: String, required: false},
	email: {type: String, required: false},
	createdAt: Date,
	comment: {type: String, required: false}
})

var PostSchema = new Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  realty: [Realty.schema],
  owner: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [CommentSchema],
  active: Boolean
});

PostSchema.statics.filters = function(){
	return {
		title: 'contains',
		description: 'contains',
	}
}

PostSchema.methods.addComment = function(comment) {
	this.comments.push(comment)
}

//Validation
PostSchema.path('realty').validate(function(realty) {
	if (realty.length === 0)
		return false
	return realty.length;
}, 'Realty cannot be blank');

module.exports = mongoose.model('Post', PostSchema);
