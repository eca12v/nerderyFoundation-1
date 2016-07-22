var myApp = angular.module( 'myApp', []);
/// Routes ///
myApp.controller( "indexController", ['$scope', '$http',
function($scope, $http) {

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
 $routeProvider
   .when('/index', {
     templateUrl: '/views/pages/index.html',
     controller: "IndexController"
   })
   .when('/home', {
     templateUrl: '/views/pages/home.html',
     controller: "HomeController"
   })
   .when('/groupLeader', {
     templateUrl: '/views/pages/groupLeader.html',
     controller: "GroupLeaderController"
   })
   .when('/admin', {
     templateUrl: '/views/pages/admin.html',
     controller: "AdminController"
   })
   .otherwise({
     redirectTo: '/home'
   });
 }]);//end of myapp confug
