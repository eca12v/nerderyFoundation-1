var myApp = angular.module( 'myApp', []);
/// Routes ///
myApp.controller( "indexController", [function() {

console.log( 'under myApp.config' );

$scope.submit = function(){
  console.log( 'submit clicked' );
  var newGroup = {
    groupName: $scope.groupNameIn,
    groupURL: $scope.groupUrlIn,
    groupContact: $scope.contactNameIn
  };

  $http({
    method: 'POST',
    url: '/groups/createGroup',
    data: newGroup
  });
};//end of submit group function
 //
 // $routeProvider
 //   .when('/index', {
 //     templateUrl: '/views/pages/index.html',
 //     controller: "indexController"
 //   })
 //   .otherwise({
 //     redirectTo: '/home'
 //   });
 }]);//end of myapp confug
