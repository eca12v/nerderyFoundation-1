var myApp = angular.module( 'myApp', ['ngRoute'] );
/// Routes ///
myApp.config(['$routeProvider', function($routeProvider) {

$routeProvider
   .when('/index', {
     templateUrl: '/views/index.html'
    //  controller: 'IndexController'
   })
   .when('/home', {
     templateUrl: '../views/home.html'
   })
   .when('/groupLeader', {
     templateUrl: '/views/groupLeader.html',
     controller: 'GroupLeaderController'
   })
   .when('/admin', {
     templateUrl: '/views/admin.html'
   })
   .otherwise({
     redirectTo: 'home'
   });

 }]);//end of myapp config
