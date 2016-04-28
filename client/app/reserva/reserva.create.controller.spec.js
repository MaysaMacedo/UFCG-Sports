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
          expect(scope.reserva).to.be.ok;
          expect(scope.reserva).to.not.be.undefined;
        });
    });

describe('Adicionando Reserva', function(){
  it('deve retornar uma resposta correta no model  depois de controller.add', 
    inject(function(_$httpBackend_) {
        
        var mockBackend = _$httpBackend_;

        mockBackend.expectPOST('/api/reservas', {id: 0, nome:"Mariana",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6}).
        respond([{}]);

        var controller = getController();
        var reserva = {id: 0, nome:"Mariana",email:"mariana@hotmail.com",
       data:"Mon Apr 25 2016 14:21:39 GMT-0300 (BRT)", recurso: 1, hora: 6};

        scope.add(reserva);
  }));

});
  

});
