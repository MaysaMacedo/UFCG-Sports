'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service')

var router = express.Router();

router.get('/', auth.isPermited(), controller.index);
router.get('/:id', auth.isPermited(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

// Comments
router.get('/:id/comments', auth.isPermited(), controller.showComments);
router.post('/:id/comments', auth.isPermited(), controller.createComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.deleteComment);

module.exports = router;