'use strict';

describe('Controller: ReservaCreateCtrl', function () {

  beforeEach(module('finalnodeApp', 'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'));

  var scope;
  var q;
  var getController;

  beforeEach( function() {
    inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    getController = function() {
                return $controller('ReservaCreateCtrl', {
                    $scope: scope
                });
            }
  });

  });

describe('Estado inicial', function() {
        it('Testa estado incial do controller', function() {
          var controller = getController();
          expect(scope.client).to.be.ok;
          expect(scope.client).to.not.be.undefined;
        });
    });

describe('Adicionando Reserva', function(){
  it('deve retornar uma resposta correta no model  depois de controller.add', 
    inject(function(_$httpBackend_) {
        
        var mockBackend = _$httpBackend_;

        mockBackend.expectPOST('/api/clients', {nome: "maysa", email:"ma@gmail.com"}).
        respond([{}]);

        var controller = getController();
        var client = {nome: "maysa", email:"ma@gmail.com"};

        scope.add(client);
  }));

});
  

});
