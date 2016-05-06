'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/tabela', {
		templateUrl : 'app/tabela/tabela.index.html',
		controller : 'TabelaIndexCtrl',
		authenticate: true
	})
});
