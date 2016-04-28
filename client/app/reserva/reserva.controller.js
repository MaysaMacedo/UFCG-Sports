'use strict';

angular.module('finalnodeApp')
  .controller('ReservaIndexCtrl', function ($scope, $http, $location, Auth) {
    $scope.reservas = [];

    $http.get('/api/reservas').success(function(reservas) {
      $scope.reservas = reservas;
    });

    $scope.noClients = function() {
      return $scope.reservas.length === 0
    }
    
    $scope.delete = function(reserva) {
      $http.delete('/api/reservas/' + reserva._id);
      $scope.reservas = []
      $http.get('/api/reservas').success(function(reservas) {
          $scope.reservas = reservas;
        });
    };
    
    $scope.show = function(reserva) {
           $location.path('/reserva/'+reserva._id)
      };
     
    $scope.edit = function(reserva) {
          $location.path('/reserva/edit/'+reserva._id)
     };
  });
