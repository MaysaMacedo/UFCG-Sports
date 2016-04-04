'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/property', {
        templateUrl: 'app/property/property.html',
        controller: 'PropertyCtrl'
      }).when('/property/new', {
          templateUrl: 'app/property/property.create.html',
          controller: 'PropertyCreateCtrl'
      })
      .when('/property/:id', {
          templateUrl: 'app/property/property.show.html',
          controller: 'PropertyShowCtrl'
      })
      .when('/property/edit/:id', {
          templateUrl: 'app/property/property.update.html',
          controller: 'PropertyUpdateCtrl'
      });
  });
