'use strict';

var express = require('express');
var controller = require('./reserva.controller');
var auth = require('../../auth/auth.service')

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;