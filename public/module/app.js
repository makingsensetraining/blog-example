'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [ 'ngRoute', 'toaster' ]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider    
        .when('/', 
            {
            controller: 'myPostsCtrl',
            templateUrl: '../views/myPosts.html'
            })
        .when('/posts', 
            {
            controller: 'myPostsCtrl',
            templateUrl: '../views/myPosts.html'
            })
        .when('/addpost',
            {
            controller: 'newPostCtrl',
            templateUrl: '../views/newPost.html' })
        .when('/toaster',
            {
            controller: 'toasterCtrl',
            templateUrl: '../views/toaster.html' })
    
        .when('/posts/:postId', 
            {
            controller: 'postDetailsCtrl',
            templateUrl: '../views/postDetails.html'
            })    
        .when('/edit/:postId', 
            {
            controller: 'editPostCtrl',
            templateUrl: '../views/editPost.html'
            })    
        .otherwise({redirectTo: '/'});
}]);



