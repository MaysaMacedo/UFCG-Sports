'use strict';

angular.module('finalnodeApp')
  .controller('SaleCreateCtrl', function ($scope, $http, $location) {
    $scope.sale = {}
    $scope.errors = {};
    $scope.properties = {}
    $http.get('/api/realtys').success(function(realtys) {
    	$scope.properties = realtys;
    })
    $scope.clients = {}
    $http.get('/api/clients').success(function(clients) {
    	$scope.clients = clients;
    })
    $scope.add = function(form) {
    	$scope.submitted = true;
      if($scope.sale === '') {
        return;
      }
      $http.post('/api/sales', $scope.sale).then( function() {
    	  $location.path('/sale')
      }).catch(function(err) {
    	  err = err.data;
    	  $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
      });
    };
  });
