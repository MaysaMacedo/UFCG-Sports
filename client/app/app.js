'use strict';

angular.module('finalnodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/404', {
        templateUrl : 'components/errors/404.html'
      })
      .when('/500', {
        templateUrl : 'components/errors/500.html'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $httpProvider.interceptors.push('apiKeyInterceptor');
  })
  .factory('httpRequestInterceptor', function ($q, $location) {
    return {
        'responseError': function(rejection) {
            if(rejection.status === 404){
                $location.path('/404/');                    
            }
            else if(rejection.status === 500){
                $location.path('/500/');                    
            }
            return $q.reject(rejection);
         }
     };
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  // Define APP ID and API KEY as MASTER APPLICATION
  .factory('apiKeyInterceptor', function ($rootScope) {
	  return {
	    	request: function (config) {
	    		config.headers['X-Application-Id'] = '5538a255bcec4a702a24bb59';
	    		config.headers['X-API-Key'] = '003d8ed40432044e7394131e09f8ad9fc57cd55d';
	    		return config;
	    	}
	    }
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        } else if(loggedIn && next.onlyAdmin && !Auth.isAdmin()) {
        	$location.path('/404')
        }
      });
    });
  })
	.directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	}]);
  