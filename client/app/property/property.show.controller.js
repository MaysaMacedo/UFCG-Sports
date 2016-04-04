'use strict';

angular.module('finalnodeApp')
  .controller('PropertyShowCtrl', function ($scope, $http, $routeParams, $location, Auth) {
    $scope.property = {};
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
  });