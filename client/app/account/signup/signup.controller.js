'use strict';

angular.module('finalnodeApp').controller('SignupCtrl', function($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.firstLogin = function() {
        return false;
    };

    $scope.register = function(form) {
        $scope.submitted = true;

        if (form.$valid) {
            $scope.user.firstLogin = false;
            Auth.createUser($scope.user)
                .then(function() {
                    // Account created, redirect to home
                    $location.path('/');
                })
                .catch(function(err) {
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

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
});
