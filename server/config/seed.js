/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var App = require('../api/app/app.model');
var Recurso = require('../api/recurso/recurso.model');

App.find({}).remove(function() {})

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'secret'
  }, function() {
      console.log('finished populating users');
    }
  );
});

User.create({
	_id : '55389e8dc4eb7fc02b2e3f11',
	provider : 'local',
	role : 'admin',
	name : 'Admin',
	email : 'admin@admin.com',
	password : 'secret'
}, function(err, user) {
	App.create({
		"_id" : "5538a255bcec4a702a24bb59",
		"apikey" : "003d8ed40432044e7394131e09f8ad9fc57cd55d",
		"name" : "Master Application",
		"__v" : 0,
		"user" : '55389e8dc4eb7fc02b2e3f11'
	}, function(err, app) {
		user.apps = [app]
		user.save(function() {
			console.log('finished master user and apps');
		})
	})

})

Recurso.find({}).remove(function() {
  Recurso.create([
    {nome: 'Ginásio'},
    {nome: 'Quadra de Tennis'},
    {nome: 'Quadra de Vôlei de Praia 1'},
    {nome: 'Quadra de Vôlei de Praia 2'},
    {nome: 'Quadra de Futebol de Areia'},
    {nome: 'Mini-campo'},
    {nome: 'Campo'}
    ], function() {
      console.log('Recursos esportivos populados com sucesso!');
    }
  );
});