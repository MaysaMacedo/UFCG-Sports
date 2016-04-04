'use strict';

describe('Controller: ExternalappCtrl', function () {

  // load the controller's module
  beforeEach(module('finalnodeApp'));

  var ExternalappCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExternalappCtrl = $controller('ExternalappCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
