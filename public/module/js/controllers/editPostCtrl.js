app.controller('editPostCtrl', function($scope, $routeParams, blogService, $location, toaster, errors) {
    //get the element by id

   // throw new Error("This is an error text.");

    $scope.current = blogService.getById($routeParams.postId)
        .success(function (current, status, headers, config) {
            $scope.current = current;
         })
        .error(function(current, status, headers, config) {
            errors.handler(current);

         });

    // update post information. Call to blogService.update()
    $scope.updatePost = function() {
        blogService.update($scope.current._id, $scope.current)
            .success(function (current, status, headers, config) {
                $location.path("/posts/"+$scope.current._id);
                toaster.pop('success', "Post updated successfully!");
             })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
             });            
    };
});