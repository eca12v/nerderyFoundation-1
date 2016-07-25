//angular.module( 'groupApp' )
myApp.factory('GroupFactory', ['$http', function($http) {
  console.log( 'groupfactory loaded');

  //  var URL = '';
   var GroupFactory = {};

   var addGroup = function ( newGroup ) {
       return $http.post('/groups/');
   };

return dataFactory;

}]); //end of Group Factory
