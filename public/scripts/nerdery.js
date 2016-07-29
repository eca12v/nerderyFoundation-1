
var myApp = angular.module( 'myApp', ['ngRoute', 'ngMaterial', 'satellizer', 'Authorization', 'ngFileUpload'  ] );

/// Routes ///

myApp.config(['$routeProvider', '$authProvider', '$mdIconProvider',  function( $routeProvider, $authProvider, $mdIconProvider ) {

$mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);

$routeProvider
   .when('/index', {
     templateUrl: '/views/index.html'
    //  controller: 'IndexController'
   })
   .when('/home', {
     templateUrl: '../views/home.html',
     controller: 'HomeController'
   })
   .when('/groups/:groupName', {
     templateUrl: '/views/group.html',
     controller: 'GroupController'
   })
   .when('/groupLeader', {
     templateUrl: '/views/groupLeader.html',
     controller: 'GroupLeaderController as ctrl',
     resolve: {
            techData: function($http){
              // var techData = {};
              return $http({
                method: "GET",
                url: '/tech.json',
              }).then(function (response) {
                return response.data;
              });
              //   angular.copy(response.data, techData);
              //   techData = response.data;
              // .then(function (response) {
              //   angular.copy(response.data, techData);
              //   techData = response.data;
              //   console.log(response.data);
              // }, function myError(response) {
              // });//End of http call
              // console.log(techData);
              // return techData;
        }
      }
   })
   .when('/admin', {
     templateUrl: '/views/admin.html',
     controller: 'AdminController'
   })
   .when('/login', {
     templateUrl: '/views/login.html',
     controller: 'LoginCtrl'
   })
   .when('/display', {
     templateUrl: '/views/display.html',
     controller: 'DisplayCtrl'
   })
   .otherwise({
     redirectTo: 'home'
   });

   $authProvider.google({
        clientId: '125382478230-3n8qqoeugab70kluqqm1o3hleh6acbcc.apps.googleusercontent.com',
        redirectUri: 'http://localhost:8080/auth/google'
      });

 }]);//end of myapp config


myApp.run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
      // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
