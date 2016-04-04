'use strict';

angular.module('finalnodeApp')
  .controller('NavbarCtrl',
		function($scope, $location, Auth) {
			$scope.menu = [ {
				'title' : 'Home',
				'link' : '/',
				'auth' : false
			}, {
				'title' : 'Clients',
				'link' : '/client',
				'auth' : true
			}, {
				'title' : 'Properties',
				'link' : '/property',
				'auth' : true
			}, {
				'title' : 'Sales',
				'link' : '/sale',
				'auth' : true
			}, {
				'title' : 'Posts',
				'link' : '/post',
				'auth' : true
			}, {
				'title' : 'API Keys',
				'link' : '/externalapp',
				'auth' : true
			} ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });