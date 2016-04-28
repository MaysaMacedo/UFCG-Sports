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
				'link' : '/reserva',
				'auth' : true,
				'icon' : 'plus'
			}, {
				'title' : 'Reservas Pendentes',
				'link' : '/reserva_pendente',
				'auth' : true,
				'icon' : 'plus',
				'admin': true
			}, {
				'title' : 'Horários',
				'link' : '/horario',
				'auth' : true,
				'icon' : 'clock-o'
			}, {
				'title' : 'Lista de Presença',
				'link' : '/presenca',
				'auth' : true,
				'icon' : 'list',
				'admin' : true
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