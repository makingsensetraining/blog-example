'use strict';

describe('Controller: myPostsCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var scope, myPostsCtrl, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();

      myPostsCtrl = $controller('myPostsCtrl', {
      $scope: scope
    });
  }));

  it('should get an array of posts', function () {
    $httpBackend.expectGET('/api/myPosts').respond(200, [{_id:"id1",title:"name1",text:"text1"},{_id:"id2",title:"name2",text2:"text2"}]);

    $httpBackend.flush();
    expect(scope.posts.length).toBe(2);
  });

});
