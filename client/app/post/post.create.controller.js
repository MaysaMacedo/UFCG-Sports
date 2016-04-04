'use strict';

angular.module('finalnodeApp')
  .controller('PostCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.post = {}
    $scope.errors = {};
    $scope.properties = {}
    $http.get('/api/realtys').success(function(realtys) {
    	$scope.properties = realtys;
    })
    $scope.add = function(form) {
    	$scope.submitted = true;
      if($scope.post === '') {
        return;
      }
      $http.post('/api/posts', $scope.post).success( function() {
    	  $location.path('/post')
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
