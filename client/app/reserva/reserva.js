'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/reserva', {
		templateUrl : 'app/reserva/reserva.index.html',
		controller : 'ReservaIndexCtrl',
		authenticate: true
	}).when('/reserva/new', {
		templateUrl : 'app/reserva/reserva.create.html',
		controller : 'ReservaCreateCtrl',
		authenticate: true
	}).when('/reserva/:id', {
		templateUrl : 'app/reserva/reserva.show.html',
		controller : 'ReservaShowCtrl',
		authenticate: true
	}).when('/reserva/edit/:id', {
		templateUrl : 'app/reserva/reserva.update.html',
		controller : 'ReservaUpdateCtrl',
		authenticate: true
	});
});
