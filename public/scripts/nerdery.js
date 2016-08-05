var myApp = angular.module( 'myApp', [
  'ui.router',
  'satellizer',
  'ngMaterial',
  'Authorization',
  'xeditable',
  'ngFileUpload',
  'ngMessages'
]);

/// Routes ///

myApp.config(['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$mdThemingProvider', '$authProvider',
function($stateProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider, $authProvider) {

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
    onEnter : ['$state', '$auth', 'groupFactory', '$stateParams',
      function($state, $auth, groupFactory, $stateParams) {
        groupFactory.getGroup($stateParams.groupName).then(function(response) {
          if (!response.data.approved) {
            if(!$auth.isAuthenticated()) {
              $state.go('home');
            }
            if(!$auth.getPayload().admin) {
              $state.go('home');
            }
          }
        });
        // console.log($auth.isAuthenticated());
        // if (!$auth.isAuthenticated()) {
        //   $state.go('login');
        // }
      }
    ],
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
          toastr.info("Please create a group submitter account to create a group.", {"positionClass": "toast-top-full-width"});
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
    }]
  }).
  state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });


  $urlRouterProvider.otherwise('home');

  $authProvider.google({
    clientId: '125382478230-3n8qqoeugab70kluqqm1o3hleh6acbcc.apps.googleusercontent.com'
  });

  $authProvider.facebook({
      clientId: '621280634704305'
  });

  $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);

  //change default color for primary
  // var indigo = $mdThemingProvider.extendPalette('indigo', {
  //     '500': '664659'
  // });
  // $mdThemingProvider.definePalette('indigo', indigo);

  //change default color for warn

  // $mdThemingProvider.definePalette('red', indigo);
  //
  // $mdThemingProvider.theme('default').primaryPalette('indigo').warnPalette('red');

  //here you change placeholder/foreground color.
  $mdThemingProvider.theme('default').foregroundPalette[3] = "gray";

  toastr.options.positionClass = "toast-top-left";
  toastr.options.showDuration = 500;
 }]);//end of myapp config


myApp.run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
      // $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
  });
