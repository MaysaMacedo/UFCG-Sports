'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteIndexCtrl', function ($scope, $http, $location, Auth) {
    $scope.clients = [];
    $http.get('/api/reservasPendentes').success(function(clients) {
      $scope.clients = clients;
      console.log($scope.clients);
    });
    
    $scope.noClients = function() {
    	return $scope.clients.length === 0
    }
    
    $scope.delete = function(client) {
      $http.delete('/api/reservasPendentes/' + client._id);
      $scope.clients = []
      $http.get('/api/reservasPendentes').success(function(clients) {
          $scope.clients = clients;
        });
    };
    
    $scope.show = function(client) {
           $location.path('/reserva_pendente/'+client._id)
      };
     
    $scope.edit = function(client) {
          $location.path('/reserva_pendente/edit/'+client._id)
     };
  });
