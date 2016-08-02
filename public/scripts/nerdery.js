var myApp = angular.module( 'myApp', [
  'ui.router',
  'satellizer',
  'ngMaterial',
  'Authorization',
  'xeditable',
  'ngFileUpload',
  'toastr'
]);

/// Routes ///

myApp.config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$authProvider',
function($stateProvider, $urlRouterProvider, $mdIconProvider, $authProvider) {

  $stateProvider.
  state('home', {
    url : '/home',
    templateUrl : 'views/home.html',
    controller : 'HomeController',
    resolve : {}
  }).
  state('group', {
    url: '/groups/:groupName',
    templateUrl: 'views/group.html',
    controller: 'GroupController',
    resolve : {
      group : ['groupFactory', '$stateParams',
  			function(groupFactory, $stateParams) {
  				return groupFactory.getGroup($stateParams.groupName);
  			}
      ]
    }
  }).
  state('addGroup', {
    url: '/addGroup',
    templateUrl: 'views/addGroup.html',
    controller: 'AddGroupController as ctrl',
    onEnter : ['$state', '$auth',
      function($state, $auth) {
        console.log($auth.isAuthenticated());
        if (!$auth.isAuthenticated()) {
          $state.go('login');
      }
    }]
  }).
  state('admin', {
    url: '/admin',
    templateUrl: 'views/admin.html',
    controller: 'AdminController',
    onEnter : ['$state', '$auth',
      function($state, $auth) {
        console.log($auth.isAuthenticated());
        console.log($auth.getPayload().admin);

        if (!$auth.isAuthenticated() || !$auth.getPayload().admin) {
          $state.go('home');
      }
<<<<<<< HEAD
    }]
  }).
  state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise('home');

  $authProvider.google({
    clientId: '125382478230-3n8qqoeugab70kluqqm1o3hleh6acbcc.apps.googleusercontent.com',
    redirectUri: 'http://localhost:8080/auth/google'
  });
=======
   })
   .when('/admin', {
     templateUrl: '/views/admin.html',
     controller: 'AdminController'
   })
   .when('/login', {
     templateUrl: '/views/login.html',
     controller: 'LoginCtrl'
   })
   .when('/display/:groupName', {
     templateUrl: '/views/display.html',
     controller: 'DisplayCtrl'
   })
   .otherwise({
     redirectTo: 'home'
   });
>>>>>>> 3b6cbac626feec44c993556f5422134deb61d640

  $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);

 }]);//end of myapp config


myApp.run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
      // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
