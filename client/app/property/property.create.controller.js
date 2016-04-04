'use strict';

angular.module('finalnodeApp')
  .controller('PropertyCreateCtrl', function ($scope, $http, $location) {
    $scope.property = {}
    $scope.errors = {};
    $scope.vm = {}
    $scope.vm.uploadme = {}
    $scope.add = function(form) {
    	$scope.submitted = true;
	  if($scope.property === '') {
	    return;
	  }
	  $scope.property.frontImage = $scope.vm.uploadme
	  $http.post('/api/realtys', $scope.property).then( function() {
	  $location.path('/property')
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
