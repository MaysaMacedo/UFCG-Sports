'use strict';

angular.module('finalnodeApp').controller('ReservaPendenteShowCtrl', function($scope, $http, $routeParams, $location, Auth) {
    var URI_RECURSO = '/api/recursos/';

    var URI_USER = '/api/users/';

    var self = this;

    $scope.recursosEsportivos = [];
 
    $scope.reserva_pendente = {};

    $scope.qtdMinimaPessoas = 0;

    $scope.isShow = function() {
        return true;
    };

    $scope.usuariosSelecionados = [];
    
    $http.get('/api/reservasPendentes/' + $routeParams.id).success(function(reserva_pendente) {
        $scope.reserva_pendente = reserva_pendente;
        $scope.reserva_pendente.data = new Date($scope.reserva_pendente.data);
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursosEsportivos = recursos;
        });
        angular.forEach(reserva_pendente.users, function(user) {
            self.getUser(user)
        });
    });
    $scope.delete = function(reserva_pendente) {
        $http.delete('/api/reservasPendentes/' + reserva_pendente._id);
        $location.path('/reserva_pendente')
    };
    $scope.isAdmin = function() {
        return Auth.isAdmin()
    }

    this.getUser = function(val) {
        $http.get(URI_USER+val).then(function(response) {
                $scope.usuariosSelecionados.push(response.data);
        });
    };
});
