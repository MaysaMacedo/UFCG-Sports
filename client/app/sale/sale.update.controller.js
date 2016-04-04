'use strict';

angular.module('finalnodeApp')
  .controller('SaleUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
	$scope.sale = {};
	$scope.errors = {};
    $scope.properties = {}
    $http.get('/api/realtys').success(function(realtys) {
    	$scope.properties = realtys;
    })
    $scope.clients = {}
    $http.get('/api/clients').success(function(clients) {
    	$scope.clients = clients;
    })
	$http.get('/api/sales/' + $routeParams.id).success(function(sale) {
	    $scope.sale = sale;
	});
	$scope.delete = function(sale) {
	  $http.delete('/api/sales/' + sale._id);
	  $location.path('/sale')
	};
	$scope.isAdmin = function() {
		return Auth.isAdmin()
	}
	
    $scope.save = function(form) {
    	$scope.submitted = true;
    	if(form.$valid) {
            $http.put('/api/sales/' + $scope.sale._id, $scope.sale).then( function() {
          	  $location.path('/sale/' + $scope.sale._id);
            }).catch(function(err) {
          	  err = err.data;
          	  $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
            });
    	}
    };
  });