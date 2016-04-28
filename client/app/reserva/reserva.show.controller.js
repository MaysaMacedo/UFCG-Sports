'use strict';

angular.module('finalnodeApp')
  .controller('ReservaShowCtrl', function ($scope, $http, $routeParams, $location, Auth) {
    $scope.reserva = {};
    $http.get('/api/reservas/' + $routeParams.id).success(function(reserva) {
        $scope.reserva = reserva;
        $scope.reserva.data = new Date($scope.reserva.data);
        $apply();
    });
    $scope.delete = function(reserva) {
      $http.delete('/api/reservas/' + reserva._id);
      $location.path('/reserva')
    };
    $scope.isAdmin = function() {
      return Auth.isAdmin()
    }
  });