'use strict';

angular.module('finalnodeApp').controller('HorarioCtrl', function($scope, $http, $location, $routeParams, Auth) {
    var URI_HORARIO = '/api/horarios/';
    var URI_RECURSO = '/api/recursos/';

    var self = this;

    $scope.horarios = [];
    $scope.recursos = [];

    $scope.horariosVazio = function() {
        return $scope.horarios.length === 0;
    };

    $scope.delete = function(recurso) {
        if (confirm("Tem certeza que deseja deletar?")) {
            $http.delete(URI_HORARIO + recurso._id);
            $scope.horarios = []
            $http.get(URI_HORARIO).success(function(horarios) {
                $scope.horarios = horarios;
            });
        }
    };

    // Criar e editar recurso
    var amanha = new Date;
    amanha.setDate(amanha.getDate() + 1);

    $scope.horario = {
        data: amanha,
        duracao: 1.5
    };

    $scope.recurso = {};

    $scope.errors = {};

    $scope.submiterForm = function(form) {
        if ($routeParams.id) {
            self.salvarHorario(form);
        } else {
            self.criarHorario(form);
        }
    }

    this.salvarHorario = function(form) {
        if ($scope.horario.nome === '') {
            return;
        }
        $http.put(URI_HORARIO + $scope.horario._id, $scope.horario).then(function() {
            $location.path('/horario')
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

    this.criarHorario = function(form) {
        if ($scope.horario.nome === '') {
            return;
        }

        $http.post(URI_HORARIO, $scope.horario).then(function() {
            $location.path('/horario')
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

    (function main() {
        $http.get(URI_HORARIO).success(function(horarios) {
            $scope.horarios = horarios;
        });

        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursos = recursos;
        });

        if ($routeParams.id) {
            $http.get(URI_HORARIO + $routeParams.id).success(function(horario) {
                $scope.horario = horario;
            });
        }

        if ($routeParams.idRecurso) {
            $http.get(URI_RECURSO + $routeParams.idRecurso).success(function(recurso) {
                $scope.recurso = recurso;
            });
        }
    })();
});
