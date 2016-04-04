'use strict';

describe('Controller: PropertyCtrl', function () {

  // load the controller's module
  beforeEach(module('finalnodeApp'));

  var PropertyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PropertyCtrl = $controller('PropertyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
