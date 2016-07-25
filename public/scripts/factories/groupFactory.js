
// angular.module( 'groupLink' )

myApp.factory( 'groupFactory', ['$http', function($http) {

  console.log( 'groupfactory loaded');

  //  var URL = '';
   var groupFactory = {};


groupFactory.submit = function ( newGroup ) {
  console.log( 'in factory, newGroup: ', newGroup);
       return $http.post('/groups/createGroup', newGroup);

   };

return groupFactory;

}]); //end of Group Factory
