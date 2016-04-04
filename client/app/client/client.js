'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/client', {
		templateUrl : 'app/client/client.index.html',
		controller : 'ClientIndexCtrl',
		authenticate: true
	}).when('/client/new', {
		templateUrl : 'app/client/client.create.html',
		controller : 'ClientCreateCtrl',
		authenticate: true
	}).when('/client/:id', {
		templateUrl : 'app/client/client.show.html',
		controller : 'ClientShowCtrl',
		authenticate: true
	}).when('/client/edit/:id', {
		templateUrl : 'app/client/client.update.html',
		controller : 'ClientUpdateCtrl',
		authenticate: true
	});
});
