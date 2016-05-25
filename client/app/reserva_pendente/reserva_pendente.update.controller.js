'use strict';

angular.module('finalnodeApp')
  .controller('ReservaPendenteUpdateCtrl', function ($scope, $http, $routeParams, $location, Auth) {
	$scope.reserva_pendente = {};
	$scope.errors = {};

	
	$http.get('/api/reservasPendentes/' + $routeParams.id).success(function(reserva_pendente) {
	    $scope.reserva_pendente = reserva_pendente;
      $scope.reserva_pendente.data = new Date($scope.reserva_pendente.data);
      $scope.countUsers = reserva_pendente.qtdPessoas;

	});
	$scope.delete = function(reserva_pendente) {
	  $http.delete('/api/reservasPendentes/' + reserva_pendente._id);
	  $location.path('/reserva_pendente')
	};
	$scope.isAdmin = function() {
		return Auth.isAdmin()
	}

  $scope.diminuiCount = function(){
    if ($scope.reserva_pendente.qtdPessoas > 0){
      $scope.reserva_pendente.qtdPessoas--;
    }
  }

  $scope.aumentaCount = function(){
    $scope.reserva_pendente.qtdPessoas++;
  }
	
    $scope.save = function(form) {
    	$scope.submitted = true;
    	if(form.$valid) {
            $scope.reserva_pendente.qtdPessoas++;
            $http.put('/api/reservasPendentes/' + $scope.reserva_pendente._id, $scope.reserva_pendente).then( function() {
          	  $location.path('/reserva_pendente/' + $scope.reserva_pendente._id);
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