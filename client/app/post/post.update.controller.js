'use strict';

angular.module('finalnodeApp')
  .controller('PostUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
	$scope.post = {};
	$scope.errors = {};
	
	$http.get('/api/posts/' + $routeParams.id).success(function(post) {
	    $scope.post = post;
	});
    $scope.properties = {}
    $http.get('/api/realtys').success(function(realtys) {
    	$scope.properties = realtys;
    })
	$scope.delete = function(post) {
	  $http.delete('/api/posts/' + post._id);
	  $location.path('/post')
	};
	$scope.isAdmin = function() {
		return Auth.isAdmin()
	}
	
    $scope.save = function(form) {
    	$scope.submitted = true;
    	if(form.$valid) {
            $http.put('/api/posts/' + $scope.post._id, $scope.post).then( function() {
          	  $location.path('/post/' + $scope.post._id);
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