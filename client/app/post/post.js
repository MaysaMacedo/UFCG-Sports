'use strict';

angular.module('finalnodeApp').config(function($routeProvider) {
	$routeProvider.when('/post', {
		templateUrl : 'app/post/post.html',
		controller : 'PostCtrl'
	}).when('/post/new', {
		templateUrl : 'app/post/post.create.html',
		controller : 'PostCreateCtrl'
	}).when('/post/:id', {
		templateUrl : 'app/post/post.show.html',
		controller : 'PostShowCtrl'
	}).when('/post/edit/:id', {
		templateUrl : 'app/post/post.update.html',
		controller : 'PostUpdateCtrl'
	});
});
