'use strict';

angular.module('finalnodeApp')
  .controller('ClientIndexCtrl', function ($scope, $http, $location, Auth) {
    $scope.clients = [];
    $http.get('/api/clients').success(function(clients) {
      $scope.clients = clients;
    });
    
    $scope.noClients = function() {
    	return $scope.clients.length === 0
    }
    
    $scope.delete = function(client) {
      $http.delete('/api/clients/' + client._id);
      $scope.clients = []
      $http.get('/api/clients').success(function(clients) {
          $scope.clients = clients;
        });
    };
    
    $scope.show = function(client) {
           $location.path('/client/'+client._id)
      };
     
    $scope.edit = function(client) {
          $location.path('/client/edit/'+client._id)
     };
  });
