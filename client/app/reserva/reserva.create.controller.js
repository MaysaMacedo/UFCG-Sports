'use strict';

angular.module('finalnodeApp')
  .controller('ReservaCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.reserva = {'dono': Auth.getCurrentUser()._id};
    $scope.errors = {};
    $scope.recursos = [];

    $scope.minDiaReserva = new Date();
    $scope.maxDiaReserva = new Date();
    $scope.maxDiaReserva.setDate($scope.minDiaReserva.getDate() + 6);

    $scope.reservaMaisRecenteDoRecurso = function() {
      $scope.minDiaReserva = new Date();
      console.log($scope.minDiaReserva)
      $http.get('/api/reservas').success(function(reservas) {
        reservas.sort(function(reserva1, reserva2){
          if(reserva1.recurso == reserva2.recurso) {
            return new Date(reserva2.data) - new Date(reserva1.data);
          }
          if(reserva2.recurso == $scope.reserva.recurso) {
            return 1;
          }
          return -1;
        });
        var reservaMaisRecente = reservas[0];
        var dataReserva = new Date();
        if(reservaMaisRecente.recurso == $scope.reserva.recurso) {
          dataReserva = new Date(reservaMaisRecente.data);
          dataReserva.setDate(dataReserva.getDate()+6);
        }
        if(dataReserva - $scope.minDiaReserva) {
          $scope.minDiaReserva = dataReserva;
        }
      });
    }

    $http.get('/api/recursos').success(function(recursos) {
      $scope.recursos = recursos;
    });

    $scope.add = function(form) {
      $scope.submitted = true;
      if($scope.reserva === '') {
        return;
      }
      $scope.reserva.dataLimite = $scope.reserva.data;
      $http.post('/api/reservas', $scope.reserva).then( function() {
        $location.path('/reserva')
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
    
    $scope.twoDigits = function(number) {
      if(number < 10) {
        return '0' + number;
      }
      return number;
    }
  });
