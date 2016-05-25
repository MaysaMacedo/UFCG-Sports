'use strict';

angular.module('finalnodeApp').controller('ReservaPendenteUpdateCtrl', function($scope, $http, $routeParams, $location, Auth) {
    var URI_RECURSO = '/api/recursos/';

    $scope.recursosEsportivos = [];

    $scope.reserva_pendente = {};
    $scope.errors = {};

    $http.get('/api/reservasPendentes/' + $routeParams.id).success(function(reserva_pendente) {
        $scope.reserva_pendente = reserva_pendente;
        $scope.reserva_pendente.data = new Date($scope.reserva_pendente.data);
    });
    $scope.delete = function(reserva_pendente) {
        $http.delete('/api/reservasPendentes/' + reserva_pendente._id);
        $location.path('/reserva_pendente')
    };

    $scope.diminuiCount = function(){
      if ($scope.reserva_pendente.qtdPessoas > 0){
        $scope.reserva_pendente.qtdPessoas--;
      }
    }

    $scope.aumentaCount = function(){
      $scope.reserva_pendente.qtdPessoas++;
    }

    $scope.isAdmin = function() {
        return Auth.isAdmin()
    }

    $scope.save = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http.put('/api/reservasPendentes/' + $scope.reserva_pendente._id, $scope.reserva_pendente).then(function() {
                $location.path('/reserva_pendente/' + $scope.reserva_pendente._id);
            }).catch(function(err) {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });
        }
    };

    (function main() {
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursosEsportivos = recursos;
        });
    })();
});
