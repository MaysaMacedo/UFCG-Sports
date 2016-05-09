'use strict';

angular.module('finalnodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true
      }).when('/main/show/:idRecurso', {
                templateUrl: 'app/horario/calendario.show.html',
                controller: 'CalendarioCtrl',
                authenticate: true
       });
  });