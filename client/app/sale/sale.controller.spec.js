'use strict';

describe('Controller: SaleCtrl', function () {

  // load the controller's module
  beforeEach(module('finalnodeApp'));

  var SaleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SaleCtrl = $controller('SaleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
