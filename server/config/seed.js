/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Client = require('../api/client/client.model');
var Realty = require('../api/realty/realty.model');
var Post = require('../api/post/post.model');
var Sale = require('../api/sale/sale.model');
var App = require('../api/app/app.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'CRUD Clients'
  }, {
    name : 'CRUD Real Estate'
  }, {
    name : 'CRUD Sales'
  },  {
    name : 'CRUD Posts'
  },  {
    name : 'CRUD External Aplications'
  },  {
    name : 'Authentication Local and Google'
  },{
    name : 'Resquest Authorization provider'
  },{
    name : 'Scopping information Support'
  });
});

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


Client.find({}).remove(function() {})

Realty.find({}).remove(function() {
	Realty.create(  {
		    type : 'Houser',
		    region: 'East',
		    city: 'Dublin',
		    address: 'Oconnor Street',
		    holder: 'OBrian',
		    owner: '55389e8dc4eb7fc02b2e3f11'
		    
		  });
})

var Post = require('../api/post/post.model');

Post.find({}).remove(function() {
  Post.create(  {
    title : 'Houser in Dublin',
    description:  'It was popularised in the 1960sith desktop publis f Lorem Ipsum'
  },  {
    title : 'House in East Waterford',
    description:  'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
  },  {
    title : 'Apartment in West Cork',
    description:   null
  },  {
    title : 'Land in county Cork',
    description:   null
  },  {
    title : 'Office in Galway',
    description:   'There are many variations of passages of Lorem Ipsum available'
  }, function() {
      console.log('finished populating posts');
  	}
  )
});

Sale.find({}).remove(function() {})