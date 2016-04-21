'use strict';

angular.module('finalnodeApp').controller('RecursoCtrl', function($scope, $http, $location, Auth) {
    var URI_RECURSO = '/api/recursos/';

    $scope.recursos = [];

    $scope.novoRecurso = undefined;

    $scope.errors = {};

    $http.get('/api/recursos').success(function(recursos) {
        $scope.recursos = recursos;
    });

    $scope.recursosVazio = function() {
        return $scope.recursos.length === 0;
    };

    $scope.delete = function(recurso) {
        $http.delete(URI_RECURSO + recurso._id);
        $scope.recursos = []
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursos = recursos;
        });
    };

    $scope.salvar = function(recurso) {
        $http.put(URI_RECURSO + $scope.recurso._id, $scope.recurso).then(function() {
            console.log(">>>>>>>>>>>>> ok salvou")
        }).catch(function(err) {

        });
    };

    $scope.add = function(recurso) {
        if (recurso.nome === '') {
            return;
        }
        $http.post(URI_RECURSO, recurso).then(function() {
            console.log(">>>>>>>>>>>>> ok cadastrou")
            $scope.novoRecurso = undefined;
        });
    };

    $scope.addRecurso = function() {
        if ($scope.novoRecurso === undefined) {
            $scope.novoRecurso = { nome: "Nome para o recurso." };
            $scope.recursos.push($scope.novoRecurso);
        } else {
            console.log("Não pode adicionar antes de salvar.")
        }
    }
});
