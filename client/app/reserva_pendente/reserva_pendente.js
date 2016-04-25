'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/reserva_pendente', {
		templateUrl : 'app/reserva_pendente/reserva_pendente.index.html',
		controller : 'ReservaPendenteIndexCtrl',
		authenticate: true
	}).when('/reserva_pendente/new', {
		templateUrl : 'app/reserva_pendente/reserva_pendente.create.html',
		controller : 'ReservaPendenteCreateCtrl',
		authenticate: true
	}).when('/reserva_pendente/:id', {
		templateUrl : 'app/reserva_pendente/reserva_pendente.show.html',
		controller : 'ReservaPendenteShowCtrl',
		authenticate: true
	}).when('/reserva_pendente/edit/:id', {
		templateUrl : 'app/reserva_pendente/reserva_pendente.update.html',
		controller : 'ReservaPendenteUpdateCtrl',
		authenticate: true
	});
});
