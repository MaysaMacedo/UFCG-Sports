'use strict';

angular.module('finalnodeApp').controller('PropertyCtrl',
		function($scope, $http, Auth) {
			$scope.properties = {}
			$http.get("/api/realtys").success(function(realtys) {
				$scope.properties = realtys;
			})
			$scope.isAdmin = function() {
				return Auth.isAdmin()
			}
			$scope.noProperties = function() {
				return $scope.properties.length == 0;
			}
		});
