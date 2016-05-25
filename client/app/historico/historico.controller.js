'use strict';

angular.module('finalnodeApp')
  .controller('HistoricoIndexCtrl', function ($scope, $http, $location) {
    $scope.reservas = [];
    $scope.users = [];
    $scope.user = {};

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });

    function ordenaReservas(reservaA, reservaB) {
      var dataA = new Date(reservaA.data);
      var dataB = new Date(reservaB.data);
      if(dataB.getTime() - dataA.getTime() == 0) {
        return reservaA.hora - reservaB.hora;
      }
      return dataB.getTime() - dataA.getTime();
    }

    $scope.atualizaHistorico = function() {
      $http.get('/api/reservas').success(function(reservas) {
        $scope.reservas = [];
        for(var chave in reservas) {
          var reserva = reservas[chave];
          if(reserva.dono[0] == $scope.user._id) {
            $scope.reservas.push(reserva);
          }
        }
        $scope.reservas.sort(ordenaReservas);
      });
    };
  });
