'use strict';

angular.module('finalnodeApp')
  .controller('ExternalappCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.app = {}
    $scope.errors = {};
    $scope.add = function(form) {
    	$scope.submitted = true;
      if($scope.app === '') {
        return;
      }
      $http.post('/api/apps', $scope.app).then( function() {
    	  $location.path('/externalapp')
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
