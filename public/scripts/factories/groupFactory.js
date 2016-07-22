angular.mobule( )
.factory('GroupFactory', ['$http', function($http) {
  console.log( 'groupfactory loaded');

  //  var URL = '';
   var GroupFactory = {};

   GroupFactory.addGroup = function ( newGroup ) {
       return $http.post('/groups/');
   };

return dataFactory;

}]); //end of Group Factory
