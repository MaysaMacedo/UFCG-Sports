'use strict';

angular.module('finalnodeApp').controller('ReservaPendenteUpdateCtrl', function($scope, $http, $routeParams, $location, Auth) {
    var URI_RECURSO = '/api/recursos/';

    var URI_USER = '/api/users/';

    var self = this;

    $scope.recursosEsportivos = [];

    $scope.reserva_pendente = {};

    $scope.errors = {};

    $scope.usuariosSelecionados = [];

    $http.get('/api/reservasPendentes/' + $routeParams.id).success(function(reserva_pendente) {
        $scope.reserva_pendente = reserva_pendente;
        $scope.reserva_pendente.data = new Date($scope.reserva_pendente.data);
        angular.forEach(reserva_pendente.users, function(user) {
            self.getUser(user)
        });
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
            $scope.reserva_pendente.users = [];
            angular.forEach($scope.usuariosSelecionados, function(user) {
                $scope.reserva_pendente.users.push(user._id);
            });
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

    $scope.getUserSelected = function(val) {
        return $http.get(URI_USER, {
            params: {
                name: val
            }
        }).then(function(response) {
            return response.data.map(function(item) {
                return item;
            });
        });
    };

    $scope.onSelect = function($item, $model, $label) {
        if (_.findWhere($scope.usuariosSelecionados, $item) == null) {
            $item.id = $item._id;
            $scope.usuariosSelecionados.push($item);
        }
    };

    $scope.deleteUser = function(user) {
        var finded = _.findWhere($scope.usuariosSelecionados, user);
        $scope.usuariosSelecionados = _.without($scope.usuariosSelecionados, finded);
    };

    this.getUser = function(val) {
        $http.get(URI_USER+val).then(function(response) {
            var id = response.data.id;
            delete response.data.id;
            response.data._id = id;
            $scope.usuariosSelecionados.push(response.data);
        });
    };

    (function main() {
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursosEsportivos = recursos;
        });
    })();
});
