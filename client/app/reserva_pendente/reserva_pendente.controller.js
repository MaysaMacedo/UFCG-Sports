'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteIndexCtrl', function ($scope, $http, $location, Auth) {
    $scope.reservas_pendentes = [];
    $http.get('/api/reservasPendentes').success(function(reservas_pendentes) {
      $scope.reservas_pendentes = reservas_pendentes;
    });
    
    $scope.noReserves = function() {
    	return $scope.reservas_pendentes.length === 0
    }
    
    $scope.delete = function(client) {
      $http.delete('/api/reservasPendentes/' + client._id);
      $scope.reservas_pendentes = []
      $http.get('/api/reservasPendentes').success(function(reservas_pendentes) {
          $scope.reservas_pendentes = reservas_pendentes;
        });
    };
    
    $scope.show = function(client) {
           $location.path('/reserva_pendente/'+client._id)
      };
     
    $scope.edit = function(client) {
          $location.path('/reserva_pendente/edit/'+client._id)
     };
  });
