'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteCreateCtrl', function ($scope, $http, $location, Auth) {
    $scope.reserva_pendente = {}
    $scope.errors = {};
    $scope.reserva_pendente.qtdPessoas = 0;

  $scope.diminuiCount = function(){
    if ($scope.reserva_pendente.qtdPessoas > 0){
      $scope.reserva_pendente.qtdPessoas--;
    }
  }

    $scope.aumentaCount = function(){
      $scope.reserva_pendente.qtdPessoas++;
    }


    $scope.add = function(form) {
    	$scope.submitted = true;
      if($scope.reserva_pendente === '') {
        return;
      } 


      $http.post('/api/reservasPendentes', $scope.reserva_pendente).then( function() {
    	  $location.path('/reserva_pendente')
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
