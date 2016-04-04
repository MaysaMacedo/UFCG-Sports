'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
    .when('/sale', {
        templateUrl: 'app/sale/sale.html',
        controller: 'SaleCtrl'
      }).when('/sale/new', {
          templateUrl: 'app/sale/sale.create.html',
          controller: 'SaleCreateCtrl'
      })
      .when('/sale/:id', {
          templateUrl: 'app/sale/sale.show.html',
          controller: 'SaleShowCtrl'
      })
      .when('/sale/edit/:id', {
          templateUrl: 'app/sale/sale.update.html',
          controller: 'SaleUpdateCtrl'
      });
  });
