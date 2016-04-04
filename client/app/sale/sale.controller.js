'use strict';

angular.module('finalnodeApp').controller('SaleCtrl',
		function($scope, $http, Auth) {
			$scope.sales = {}
			$http.get("/api/sales").success(function(sales) {
				$scope.sales = sales;
			})
			$scope.isAdmin = function() {
				return Auth.isAdmin()
			}
			$scope.noSales = function() {
				return $scope.sales.length == 0;
			}
			$scope.delete = function(sale) {
		    		$http.delete('/api/sales/'+sale._id).success(function() {
		    			angular.forEach($scope.sales, function(u, i) {
		    		        if (u === sale) {
		    		          $scope.sales.splice(i, 1);
		    		        }
		    		      });
		    		})
		    }
		});
