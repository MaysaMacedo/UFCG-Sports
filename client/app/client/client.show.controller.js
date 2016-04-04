'use strict';

angular.module('finalnodeApp')
  .controller('ClientShowCtrl', function ($scope, $http, $routeParams, $location, Auth) {
    $scope.client = {};
    $http.get('/api/clients/' + $routeParams.id).success(function(client) {
        $scope.client = client;
    });
    $scope.delete = function(client) {
      $http.delete('/api/clients/' + client._id);
      $location.path('/client')
    };
    $scope.isAdmin = function() {
    	return Auth.isAdmin()
    }
  });