'use strict';

var app = angular.module('myApp', [ 'ngRoute', 'toaster' ])
  .config(function ( $locationProvider) {
    $locationProvider.html5Mode(true);
  })
