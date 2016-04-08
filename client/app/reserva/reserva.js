'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/client', {
		templateUrl : 'app/reserva/reserva.index.html',
		controller : 'ReservaIndexCtrl',
		authenticate: true
	}).when('/client/new', {
		templateUrl : 'app/reserva/reserva.create.html',
		controller : 'ReservaCreateCtrl',
		authenticate: true
	}).when('/client/:id', {
		templateUrl : 'app/reserva/reserva.show.html',
		controller : 'ReservaShowCtrl',
		authenticate: true
	}).when('/client/edit/:id', {
		templateUrl : 'app/reserva/reserva.update.html',
		controller : 'ReservaUpdateCtrl',
		authenticate: true
	});
});
