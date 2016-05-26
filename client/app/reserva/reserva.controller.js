'use strict';

angular.module('finalnodeApp')
  .controller('ReservaIndexCtrl', function ($scope, $http, $location, Auth, User) {
    $scope.reservas = [];
    $scope.user = {};
    $scope.phone = ''

    $http.get('/api/reservas').success(function(reservas) {
      $scope.reservas = reservas;
      // $scope.user.telefone = '9953-6749';
      $scope.user = Auth.getCurrentUser();
      console.log($scope.user)
      console.log($scope.user._id);
      console.log($scope.user.telefone);
    });

    $scope.noClients = function() {
      return $scope.reservas.length === 0
    }

    $scope.requirePhone = function () {
      return typeof $scope.user.telefone == 'undefined';
    }

    $scope.addPhone = function(user) {
      console.log('adding phone ' + $scope.phone);
      $scope.user.telefone = $scope.phone;
      var id = $scope.user._id;
      $http.put('/api/users/'+id, $scope.user);
    }
    
    $scope.delete = function(reserva) {
      $http.delete('/api/reservas/' + reserva._id);
      $scope.reservas = []
      $http.get('/api/reservas').success(function(reservas) {
          $scope.reservas = reservas;
        });
    };
    
    $scope.show = function(reserva) {
           $location.path('/reserva/'+reserva._id)
      };
     
    $scope.edit = function(reserva) {
          $location.path('/reserva/edit/'+reserva._id)
     };

  });
