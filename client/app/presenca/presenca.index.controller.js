'use strict';

angular.module('finalnodeApp')
  .controller('PresencaIndexCtrl', function ($scope, $http, $location, Auth) {
    $scope.reservas = [];
    $scope.presenca = 'Ausente';

    $http.get('/api/reservas').success(function(reservas) {
      $scope.reservas = reservas;
    });
    
    $scope.noReservas = function() {
    	return $scope.reservas.length === 0
    }
    
  });
