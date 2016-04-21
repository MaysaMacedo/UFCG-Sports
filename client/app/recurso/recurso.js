'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/recurso', {
		templateUrl : 'app/recurso/recurso.index.html',
		controller : 'RecursoCtrl',
		authenticate: true
	});
});
