<<<<<<< HEAD
//angular.module( 'groupApp' )
myApp.factory('GroupFactory', ['$http', function($http) {
=======
// angular.module( 'groupLink' )

myApp.factory( 'groupFactory', ['$http', function($http) {
>>>>>>> 315f1675c7c2c62afcc7f009af50cd186a5c93c6
  console.log( 'groupfactory loaded');

  //  var URL = '';
   var groupFactory = {};

<<<<<<< HEAD
   var addGroup = function ( newGroup ) {
       return $http.post('/groups/');
=======
groupFactory.submit = function ( newGroup ) {
  console.log( 'in factory, newGroup: ', newGroup);
       return $http.post('/groups/createGroup', newGroup);
>>>>>>> 315f1675c7c2c62afcc7f009af50cd186a5c93c6
   };

return groupFactory;

}]); //end of Group Factory
