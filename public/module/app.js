'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute', 'toaster' ]);

app.config(['$routeProvider','$provide','$httpProvider', function($routeProvider, $provide, $httpProvider) {
 'use strict';
    $routeProvider    
        .when('/', 
            {
            controller: 'myPostsCtrl',
            templateUrl: 'module/views/myPosts.html'
            })
         .when('/login', 
	    {
            templateUrl: 'module/views/login.html',
            controller: 'LoginCtrl'
            })
        .when('/addpost',
            {
            controller: 'newPostCtrl',
            templateUrl: 'module/views/newPost.html' })
        .when('/toaster',
            {
            controller: 'toasterCtrl',
            templateUrl: 'module/views/toaster.html' })

        .when('/posts/:postId', 
            {
            controller: 'postDetailsCtrl',
            templateUrl: 'module/views/postDetails.html'
            })    
        .when('/edit/:postId', 
            {
            controller: 'editPostCtrl',
            templateUrl: 'module/views/editPost.html'
            })    
        .otherwise({redirectTo: '/'});

    $provide.decorator("$exceptionHandler", function($delegate, $injector){
        return function(exception, cause){
            var toaster = $injector.get("toaster");
            toaster.pop('error', exception.message);

            $delegate(  exception , cause);
        };
    });

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function ($q,$location, $rootScope) {
        return {
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    $rootScope.message = 'Authentication failed.';
                    $rootScope.isLogged = false;
                    $location.url('/login');
                }
                return $q.reject(rejection);
            }
        };
    });

}]);



