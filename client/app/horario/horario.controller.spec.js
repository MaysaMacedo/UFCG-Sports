'use strict';

describe('Controller: HorarioCtrl', function() {

    beforeEach(module('finalnodeApp',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap'
    ));

    var URI_RECURSO = '/api/recursos/';
    var URI_HORARIO = '/api/horarios/';
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
                $httpBackend.expectGET(URI_HORARIO).respond([{ descricao: "Prefeitura Universitaria" }]);
                $httpBackend.expectGET(URI_RECURSO).respond([{ nome: "Quadra de Tennis" }]);
                return $controller('HorarioCtrl', {
                    $scope: scope
                });
            }
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Testa crud de horarios', function() {
        it('Testa criarHorario', function() {
            var controller = getController();

            scope.horario = { descricao: "Prefeitura Universitaria" };

            controller.criarHorario();

            var horarioEsperado = { descricao: "Prefeitura Universitaria"};
            $httpBackend.expectPOST(URI_HORARIO, horarioEsperado).respond({});
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.expectGET("app/horario/horario.index.html").respond({});
            $httpBackend.flush();
        });

        it('Testa salvarHorario', function() {
            var controller = getController();

            scope.horario = { descricao: "Prefeitura Universitaria", _id: 1 }

            controller.salvarHorario();

            var horarioEsperado = { descricao: "Prefeitura Universitaria", _id: 1 }
            $httpBackend.expectPUT(URI_HORARIO + horarioEsperado._id, horarioEsperado).respond({});
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.expectGET("app/horario/horario.index.html").respond({});
            $httpBackend.flush();
        });

        it('Testa $scope.delete', function() {
            var controller = getController();

            scope.horario = { descricao: "Prefeitura Universitaria", _id: 1 }

            var confirm = sinon.stub(window, "confirm", function() {
                return true;
            });

            scope.delete(scope.horario);

            var horarioEsperado = { descricao: "Prefeitura Universitaria", _id: 1 }
            $httpBackend.expectDELETE(URI_HORARIO + horarioEsperado._id).respond({});
            $httpBackend.expectGET(URI_HORARIO).respond([{ descricao: "Prefeitura Universitaria" }]);
            $httpBackend.expectGET("app/main/main.html").respond({});
            $httpBackend.flush();
        });
    });
});
