'use strict';

describe('Controller: ReservaIndexCtrl', function () {

  beforeEach(module('finalnodeApp'),'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap');

  var ReservaIndexCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservaIndexCtrl = $controller('ReservaIndexCtrl', {
      $scope: scope
    });
  }));

  it("deve existir", function() {
      expect(scope.reservas.length).to.equal(0);
  });

  it('checa se a resposta eh a esperada quando um GET acontecer', 
    inject(function(_$httpBackend_) {
      var mockBackend = _$httpBackend_;

      mockBackend.when('GET', 'app/account/login/login.html').respond({name: 'Test User',email: 'test@test.com',
      password: 'secret'});

      mockBackend.expectGET('/api/reservas').respond([{id: 0, nome:"Mariana",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6}]);
        
      mockBackend.flush();  

      expect(scope.reservas.length).to.equal(1);
      expect(scope.reservas).to.deep.equal([{id: 0, nome:"Mariana",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6}]);
  }));

});
