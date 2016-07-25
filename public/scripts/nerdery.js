var myApp = angular.module( 'myApp', ['ngRoute', 'satellizer', 'Authorization'] );
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
   .when('/login', {
     templateUrl: '/views/login.html',
     controller: 'LoginCtrl'
   })
   .otherwise({
     redirectTo: 'home'
   });

 }]);//end of myapp config

myApp.run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
      // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
