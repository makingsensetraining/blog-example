'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute', 'toaster' ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider    
        .when('/', 
            {
            controller: 'myPostsCtrl',
            templateUrl: 'module/views/myPosts.html'
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
}]);



