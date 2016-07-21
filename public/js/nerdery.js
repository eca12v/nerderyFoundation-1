var myApp = angular.module( 'myApp', []);
/// Routes ///
myApp.controller([function() {

console.log( 'under myApp.config' );

 $routeProvider
   .when('/index', {
     templateUrl: '/views/pages/index.html',
     controller: "indexController"
   })
   .otherwise({
     redirectTo: '/home'
   });
 }]);//end of myapp confug
