'use strict';

angular.module('finalnodeApp')
  .controller('SaleShowCtrl', function ($scope, $http, $routeParams, $location, Auth) {
    $scope.sale = {};
    $http.get('/api/sales/' + $routeParams.id).success(function(sale) {
        $scope.sale = sale;
        $http.get('/api/realtys/' + sale.realty).success(function(realty) {
            $scope.sale.realty = realty;
        });
        
        $http.get('/api/clients/' + sale.client).success(function(realty) {
            $scope.sale.client = realty;
        });
    });
    $scope.delete = function(sale) {
      $http.delete('/api/sales/' + sale._id);
      $location.path('/sale')
    };
    $scope.isAdmin = function() {
    	return Auth.isAdmin()
    }
  });