'use strict';

describe('Controller: ReservaUpdateCtrl', function () {

  beforeEach(module('finalnodeApp'),'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap');

  var ReservaUpdateCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope, $routeParams) {
    scope = $rootScope.$new();
    
    ReservaUpdateCtrl = $controller('ReservaUpdateCtrl', {
          $scope: scope, 
          $routeParams :{ id: "0" }
        });
  }));


  it('checa se a resposta quando eh requerido um update eh a esperada', 
    inject(function(_$httpBackend_) {
        var mockBackend = _$httpBackend_;

        mockBackend.when('GET', 'app/account/login/login.html').respond({name: 'Test User',email: 'test@test.com',
        password: 'secret'});
        mockBackend.expectGET('/api/reservas/0').respond([{id: 0, nome:"Mariana",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6}]);
        
        mockBackend.whenPUT('/reserva/edit/0', {id: 0, nome:"Mariana-update",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6}).respond({});    
        scope.save({id: 0, nome:"Mariana-update",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6});

        mockBackend.flush();

  }));

});
