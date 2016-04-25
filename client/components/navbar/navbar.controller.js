'use strict';

angular.module('finalnodeApp')
  .controller('NavbarCtrl',
		function($scope, $location, Auth) {
			$scope.menu = [ {
				'title' : 'Início',
				'link' : '/',
				'auth' : false,
				'icon' : 'home'
			}, {
				'title' : 'Recursos Esportivos',
				'link' : '/recurso',
				'auth' : true,
				'icon' : 'th'
			}, {
				'title' : 'Reservas',
				'link' : '/client',
				'auth' : true,
				'icon' : 'plus'
			}, {
				'title' : 'Reservas Pendentes',
				'link' : '/reserva_pendente',
				'auth' : true,
				'icon' : 'plus'
			}, {
				'title' : 'Calendário',
				'link' : '/property',
				'auth' : true,
				'icon' : 'calendar'
			}, {
				'title' : 'Relatórios',
				'link' : '/sale',
				'auth' : true,
				'icon' : 'area-chart'
			}, {
				'title' : 'Sobre',
				'link' : '/sobre',
				'auth' : true,
				'icon' : 'group'
			}, {
				'title' : 'API Keys',
				'link' : '/externalapp',
				'auth' : true,
				'icon' : 'tty'
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