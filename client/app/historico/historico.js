'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/historico', {
		templateUrl : 'app/historico/historico.index.html',
		controller : 'HistoricoIndexCtrl',
		authenticate: true
	})
});
