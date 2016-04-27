'use strict';

describe('Controller: RecursoCtrl', function() {

    beforeEach(module('finalnodeApp',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap'
    ));

    var URI_RECURSO = '/api/recursos/';
    var scope;
    var q;
    var getController;
    var $httpBackend;

    beforeEach(function() {
        inject(function($controller, $rootScope, $q, _$httpBackend_, Auth) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            q = $q;

            var auth = sinon.stub(Auth, "isLoggedInAsync", function() {
                return true;
            });

            getController = function() {
                $httpBackend.expectGET(URI_RECURSO).respond([{ nome: "Quadra de Tennis" }]);
                return $controller('RecursoCtrl', {
                    $scope: scope
                });
            }
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Testa crud de recursos esportivos', function() {
        it('Testa criarRecurso', function() {
            var controller = getController();

            scope.recurso = { nome: "Quadra de Tennis" }

            controller.criarRecurso();

            var recursoEsperado = { nome: "Quadra de Tennis" }
            $httpBackend.expectPOST(URI_RECURSO, recursoEsperado).respond({});
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.expectGET("app/recurso/recurso.index.html").respond({});
            $httpBackend.flush();
        });

        it('Testa salvarRecurso', function() {
            var controller = getController();

            scope.recurso = { nome: "Quadra de Tennis", _id: 1 }

            controller.salvarRecurso();

            var recursoEsperado = { nome: "Quadra de Tennis", _id: 1 }
            $httpBackend.expectPUT(URI_RECURSO + recursoEsperado._id, recursoEsperado).respond({});
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.expectGET("app/recurso/recurso.index.html").respond({});
            $httpBackend.flush();
        });

        it('Testa $scope.delete', function() {
            var controller = getController();

            scope.recurso = { nome: "Quadra de Tennis", _id: 1 }

            scope.delete(scope.recurso);

            var recursoEsperado = { nome: "Quadra de Tennis", _id: 1 }
            $httpBackend.expectDELETE(URI_RECURSO + recursoEsperado._id).respond({});
            $httpBackend.expectGET(URI_RECURSO).respond([{ nome: "Quadra de Tennis" }]);
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.flush();
        });
    });

});
