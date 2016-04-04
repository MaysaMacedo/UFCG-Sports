/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var hal = require('express-hal')
var bodyParser = require('body-parser')

module.exports = function(app) {
	// Insert routes below
	app.use('/api/apps', require('./api/app'));
	app.use('/api/posts', require('./api/post'));
	app.use('/api/sales', require('./api/sale'));
	app.use('/api/realtys', require('./api/realty'));
	app.use('/api/clients', require('./api/client'));
	app.use('/api/things', require('./api/thing'));
	app.use('/api/users', require('./api/user'));

	app.use('/auth', require('./auth'));

	app.use(hal.middleware);

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(
			errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*').get(function(req, res) {
		res.sendfile(app.get('appPath') + '/index.html');
	});

};
