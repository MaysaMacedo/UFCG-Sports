'use strict';

angular.module('finalnodeApp')
  .controller('ReservaUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
  $scope.reserva = {};
  $scope.errors = {};
  
  $http.get('/api/reservas/' + $routeParams.id).success(function(reserva) {
        $scope.reserva = reserva;
        $scope.reserva.data = new Date($scope.reserva.data);
  });
  $scope.delete = function(reserva) {
    $http.delete('/api/reservas/' + reserva._id);
    $location.path('/reserva')
  };
  $scope.isAdmin = function() {
    return Auth.isAdmin()
  }
  
    $scope.save = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
            $http.put('/api/reservas/' + $scope.reserva._id, $scope.reserva).then( function() {
              $location.path('/reserva/' + $scope.reserva._id);
            }).catch(function(err) {
              err = err.data;
              $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
            });
      }
    };
  });