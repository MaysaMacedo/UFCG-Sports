'use strict';

angular.module('finalnodeApp')
  .controller('PostShowCtrl', function ($scope, $http, $routeParams, $location, $interval, Auth) {
	var reloadData = function() {
		$http.get('/api/posts/' + $routeParams.id).success(function(post) {
            $scope.post = post;
            $scope.post.realty = $scope.post.realty[0]
        });
	}
    $scope.post = {};
    reloadData()
    $scope.delete = function(post) {
      $http.delete('/api/posts/' + post._id);
      $location.path('/post')
    };
    $scope.isAdmin = function() {
    	return Auth.isAdmin()
    }
    $scope.reload = function() {
    	reloadData()
    }
    $scope.deleteComment = function(comment) {
        $http.delete('/api/posts/' + $scope.post._id+'/comments/'+comment._id).success(function(post){
        	reloadData()
        });
        
      };
//      
//    $interval(function() {
//    	reloadData()
//    }, 10000)
  });