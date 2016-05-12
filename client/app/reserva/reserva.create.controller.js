'use strict';

angular.module('finalnodeApp')
  .controller('ReservaCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.reserva = {};
    $scope.errors = {};
    $scope.recursos = [];

    $scope.minDiaReserva = new Date();
    $scope.maxDiaReserva = new Date();
    $scope.maxDiaReserva.setDate($scope.minDiaReserva.getDate() + 6);
    
    function ordenaReservasPorRecursoEData(reserva1, reserva2) {
      if(reserva1.recurso == reserva2.recurso) {
        return new Date(reserva2.data) - new Date(reserva1.data);
      }
      if(reserva2.recurso == $scope.reserva.recurso) {
        return 1;
      }
      return -1;
    }

    $scope.reservaMaisRecenteDoRecurso = function() {
      var SEIS_DIAS = 6;
      $scope.reserva.data = undefined;
      $scope.minDiaReserva = new Date();
      $scope.maxDiaReserva = new Date();
      $scope.maxDiaReserva.setDate($scope.minDiaReserva.getDate() + SEIS_DIAS);

      $http.get('/api/reservas').success(function(reservas) {
        if(reservas.length > 0) {
          reservas.sort(ordenaReservasPorRecursoEData);
          var reservaMaisRecente = reservas[0];
          var dataReserva = new Date();
          if(reservaMaisRecente.recurso == $scope.reserva.recurso) {
            dataReserva = new Date(reservaMaisRecente.data);
            dataReserva.setDate(dataReserva.getDate()+SEIS_DIAS);
          }
          if(dataReserva.getTime() - $scope.minDiaReserva.getTime() > 0) {
            $scope.minDiaReserva = dataReserva;
          }
          if($scope.minDiaReserva.getTime() - $scope.maxDiaReserva.getTime() > 0) {
            alert("Você não pode reservar o mesmo recurso duas vezes na mesma semana.");
          }
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
      $scope.reserva.nome = Auth.getCurrentUser().name;
      $scope.reserva.email = Auth.getCurrentUser().email;

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
