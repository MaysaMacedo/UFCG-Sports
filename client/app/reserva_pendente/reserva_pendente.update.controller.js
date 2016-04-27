'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
	$scope.client = {};
	$scope.errors = {};
	
	$http.get('/api/reservasPendentes/' + $routeParams.id).success(function(client) {
	    $scope.client = client;
      $scope.client.data = new Date($scope.client.data);
	});
	$scope.delete = function(client) {
	  $http.delete('/api/reservasPendentes/' + client._id);
	  $location.path('/reserva_pendente')
	};
	$scope.isAdmin = function() {
		return Auth.isAdmin()
	}
	
    $scope.save = function(form) {
    	$scope.submitted = true;
    	if(form.$valid) {
            $http.put('/api/reservasPendentes/' + $scope.client._id, $scope.client).then( function() {
          	  $location.path('/reserva_pendente/' + $scope.client._id);
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