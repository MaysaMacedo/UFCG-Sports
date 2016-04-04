'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/user/:id', {
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl',
        onlyAdmin: true
      });
  });
