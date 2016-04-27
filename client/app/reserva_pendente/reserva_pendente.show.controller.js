'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteShowCtrl', function ($scope, $http, $routeParams, $location, Auth) {
    $scope.client = {};
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
  });