'use strict';

angular.module('finalnodeApp')
  .controller('UserCtrl', function ($scope,$http,$routeParams,$location,User) {
	  $scope.user = {};
	    $http.get('/api/users/' + $routeParams.id).success(function(user) {
	        $scope.user = user;
	    });
	    $scope.delete = function() {
	      User.remove({ id: $routeParams.id });
	      $location.path('/admin')
	    };
  });
