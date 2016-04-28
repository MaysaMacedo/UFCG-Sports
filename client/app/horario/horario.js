'use strict';

angular.module('finalnodeApp')
    .config(function($routeProvider) {
        $routeProvider.when('/horario', {
                templateUrl: 'app/horario/horario.index.html',
                controller: 'HorarioCtrl',
                authenticate: true
            }).when('/horario/new/:idRecurso', {
                templateUrl: 'app/horario/horario.form.html',
                controller: 'HorarioCtrl',
                authenticate: true
            }).when('/horario/edit/:id', {
                templateUrl: 'app/horario/horario.form.html',
                controller: 'HorarioCtrl',
                authenticate: true
            }).when('/horario/visualizar/:idRecurso', {
                templateUrl: 'app/horario/horario.visualizacao.html',
                controller: 'HorarioCtrl',
                authenticate: true
            });
    });
