'use strict';

angular.module('finalnodeApp')
  .config(function($routeProvider) {
	$routeProvider.when('/presenca', {
		templateUrl : 'app/presenca/presenca.index.html',
		controller : 'PresencaIndexCtrl',
		authenticate: true
	});
});
