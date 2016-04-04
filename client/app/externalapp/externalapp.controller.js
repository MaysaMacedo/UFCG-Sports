'use strict';

angular.module('finalnodeApp')
  .controller('ExternalappCtrl', function ($scope, $http, Auth) {
	$scope.apps = {}
	$scope.editingApp = {};
	$scope.errors = {};
	$http.get('/api/apps').success(function(apps) {
		$scope.apps = apps;
	})
	$scope.isAdmin = function() {
    	return Auth.isAdmin()
    }
    $scope.noApps = function() {
    	return $scope.apps.length == 0;
    }
	$scope.delete = function(app) {
    	if(app._id == '5538a255bcec4a702a24bb59') {
    		console.log('can not delete master app')
    	} else {
    		$http.delete('/api/apps/'+app._id).success(function() {
    			angular.forEach($scope.apps, function(u, i) {
    		        if (u === app) {
    		          $scope.apps.splice(i, 1);
    		        }
    		      });
    		})
    	}
    }
	var oldName = "";
	$scope.edit = function(app) {
		if($scope.editingApp != {}) {
			$scope.editingApp.name = oldName;
		}
		$scope.editingApp = app;
		oldName = app.name
	}
	$scope.editing = function(app) {
		return $scope.editingApp._id === app._id
	}
	$scope.cancelEditing = function(app) {
		app.name = oldName
		$scope.editingApp = {};
	}
	$scope.save = function(app) {
	  if(app.name == undefined) { app.name = ""}
      $scope.submitted = true;
      $http.put('/api/apps/'+app._id, app).success( function(app) {
    		 $scope.editingApp = {};
      }).catch(function(err) {
    	  err = err.data;
    	  $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            $scope.errors[field+app._id] = error.message;
          });
          $scope.submitted = false;
      });
	}
  });
