'use strict';

angular.module('finalnodeApp')
  .controller('ReservaCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.reserva = {}
    $scope.errors = {};
    $scope.add = function(form) {
      $scope.submitted = true;
      if($scope.reserva === '') {
        return;
      }
      $http.post('/api/reservas', $scope.reserva).then( function() {
        $location.path('/reserva')
      }).catch(function(err) {
        err = err.data;
        $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
      });
    };
  });
