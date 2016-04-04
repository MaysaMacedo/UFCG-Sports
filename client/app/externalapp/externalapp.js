'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/externalapp', {
        templateUrl: 'app/externalapp/externalapp.html',
        controller: 'ExternalappCtrl',
        authenticate: true
      })
      .when('/externalapp/new', {
          templateUrl: 'app/externalapp/externalapp.create.html',
          controller: 'ExternalappCreateCtrl',
          authenticate: true
        });
  });
