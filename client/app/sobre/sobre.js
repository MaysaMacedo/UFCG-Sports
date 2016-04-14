'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sobre', {
        templateUrl: 'app/sobre/sobre.html',
        onlyAdmin: true
      });
  });
