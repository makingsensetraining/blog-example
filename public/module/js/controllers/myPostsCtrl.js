app.controller('myPostsCtrl', function($scope, blogService, toaster) {
    'use strict';

    //get all elements
    blogService.getAll()
        .success(function (posts, status, headers, config) {
            $scope.posts = posts;
        })
        .error(function(current, status, headers, config) {
            toaster.pop('error', current);
        });
});