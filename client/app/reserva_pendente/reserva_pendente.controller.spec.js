'use strict';

describe('Controller: ReservaPendenteIndexCtrl', function () {

  beforeEach(module('finalnodeApp'),'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap');

  var ReservaIndexCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservaIndexCtrl = $controller('ReservaPendenteIndexCtrl', {
      $scope: scope
    });
  }));

  it("should exist", function() {
      expect(scope.clients.length).to.equal(0);
  });

  it('checa se a resposta eh a esperada quando um GET acontecer', 
    inject(function(_$httpBackend_) {
      var mockBackend = _$httpBackend_;

      mockBackend.when('GET', 'app/account/login/login.html').respond({name: 'Test User',email: 'test@test.com',
      password: 'secret'});

      mockBackend.expectGET('/api/clients').respond([{id: 0, nome:"Mariana",email:"mariana@hotmail.com"}]);
        
      mockBackend.flush();  

      expect(scope.clients.length).to.equal(1);
      expect(scope.clients).to.deep.equal([{id: 0, nome:"Mariana",email:"mariana@hotmail.com"}]);
  }));

});
