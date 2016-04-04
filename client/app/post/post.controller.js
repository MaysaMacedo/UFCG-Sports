'use strict';

angular.module('finalnodeApp')
  .controller('PostCtrl', function ($scope, $http, $location, Auth) {
    $scope.posts = [];
    $http.get('/api/posts').success(function(response) {
      $scope.posts = response.results;
    });
    
    $scope.noPosts = function() {
    	return $scope.posts.length === 0
    }
    
    $scope.delete = function(post) {
      $http.delete('/api/posts/' + post._id);
      $scope.posts = []
      $http.get('/api/posts').success(function(posts) {
          $scope.posts = posts;
        });
    };
  });
