'use strict';

angular.module('finalnodeApp')
    .config(function($routeProvider) {
        $routeProvider.when('/recurso', {
                templateUrl: 'app/recurso/recurso.index.html',
                controller: 'RecursoCtrl',
                authenticate: true
            }).when('/recurso/new', {
                templateUrl: 'app/recurso/recurso.form.html',
                controller: 'RecursoCtrl',
                authenticate: true
            }).when('/recurso/edit/:id', {
                templateUrl: 'app/recurso/recurso.form.html',
                controller: 'RecursoCtrl',
                authenticate: true
            });
    });
