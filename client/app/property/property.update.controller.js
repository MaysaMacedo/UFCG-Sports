'use strict';

angular.module('finalnodeApp')
  .controller('PropertyUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
	$scope.property = {};
	$scope.errors = {};
    $scope.vm = {}
    $scope.vm.uploadme = {}
	$http.get('/api/realtys/' + $routeParams.id).success(function(property) {
	    $scope.property = property;
	});
	$scope.delete = function(property) {
	  $http.delete('/api/realtys/' + property._id);
	  $location.path('/property')
	};
	$scope.isAdmin = function() {
		return Auth.isAdmin()
	}
	
    $scope.save = function(form) {
    	$scope.submitted = true;
    	$scope.property.frontImage = $scope.vm.uploadme
    	if(form.$valid) {
            $http.put('/api/realtys/' + $scope.property._id, $scope.property).then( function() {
          	  $location.path('/property/' + $scope.property._id);
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