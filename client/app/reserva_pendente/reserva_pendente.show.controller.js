'use strict';

angular.module('finalnodeApp').controller('ReservaPendenteShowCtrl', function($scope, $http, $routeParams, $location, Auth) {
    var URI_RECURSO = '/api/recursos/';

    $scope.recursosEsportivos = [];
 
    $scope.reserva_pendente = {};
    
    $http.get('/api/reservasPendentes/' + $routeParams.id).success(function(reserva_pendente) {
        $scope.reserva_pendente = reserva_pendente;
        $scope.reserva_pendente.data = new Date($scope.reserva_pendente.data);
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursosEsportivos = recursos;
        });
    });
    $scope.delete = function(reserva_pendente) {
        $http.delete('/api/reservasPendentes/' + reserva_pendente._id);
        $location.path('/reserva_pendente')
    };
    $scope.isAdmin = function() {
        return Auth.isAdmin()
    }
});
