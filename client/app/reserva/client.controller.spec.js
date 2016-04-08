'use strict';

describe('Controller: ClientCtrl', function () {

  // load the controller's module
  beforeEach(module('finalnodeApp'));

  var ClientCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientCtrl = $controller('ClientCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
