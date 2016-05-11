'use strict';

angular.module('finalnodeApp').controller('RecursoCtrl', function($scope, $http, $location, $routeParams, Auth) {
    var URI_RECURSO = '/api/recursos/';

    var self = this;

    var MAX_HORAS_DIA = 24;

    var MIN_HORAS_DIA = 0;

    var HORARIO_DEFAULT = 5;

    $scope.recursos = [];
    
    $scope.recursosVazio = function() {
        return $scope.recursos.length === 0;
    };

    $scope.delete = function(recurso) {
        if (confirm("Tem certeza que deseja deletar?")) {
            $http.delete(URI_RECURSO + recurso._id);
            $scope.recursos = []
            $http.get(URI_RECURSO).success(function(recursos) {
                $scope.recursos = recursos;
            });
        }
    };

    // Criar e editar recurso

    $scope.recurso = { horariosDisponiveis: [HORARIO_DEFAULT],
                       active: true,
                       private: false };

    $scope.errors = {};

    $scope.submiterForm = function(form) {
        if ($routeParams.id) {
            self.salvarRecurso(form);
        } else {
            self.criarRecurso(form);
        }
    };

    this.salvarRecurso = function(form) {
        if ($scope.recurso.nome === '') {
            return;
        }
        $http.put(URI_RECURSO + $scope.recurso._id, $scope.recurso).then(function() {
            $location.path('/recurso')
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

    this.criarRecurso = function(form) {
        if ($scope.recurso.nome === '') {
            return;
        }

        $http.post(URI_RECURSO, $scope.recurso).then(function() {
            $location.path('/recurso')
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

    $scope.addHorario = function() {
        var length = $scope.recurso.horariosDisponiveis.length;
        var novoHorario = $scope.recurso.horariosDisponiveis[length - 1] + 1;
        if (novoHorario === MAX_HORAS_DIA) {
            novoHorario = MIN_HORAS_DIA;
        } else if (length === 0) {
            novoHorario = HORARIO_DEFAULT;
        }
        $scope.recurso.horariosDisponiveis.push(novoHorario);
    };

    $scope.removeHorario = function(index) {
        $scope.recurso.horariosDisponiveis.splice(index, 1);
    };

    (function main() {
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursos = recursos;
        });

        if ($routeParams.id) {
            $http.get(URI_RECURSO + $routeParams.id).success(function(recurso) {
                $scope.recurso = recurso;
            });
        }
    })();
});
