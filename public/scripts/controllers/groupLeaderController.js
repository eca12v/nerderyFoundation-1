console.log('group leader cont has arrived');
<<<<<<< HEAD
myApp.controller( 'GroupLeaderController', ['$scope', '$http', '$location', '$rootScope', 'grouApp', function( $scope, $http, $location, $rootScope, groupApp ){
=======
// angular.module( 'groupLink' )
myApp.controller( 'GroupLeaderController', [ 'groupFactory', '$scope', '$http', '$location', '$rootScope',  function( groupFactory, $scope,  $http, $location, $rootScope ){
>>>>>>> 315f1675c7c2c62afcc7f009af50cd186a5c93c6
console.log( 'loaded GroupLeaderController');

//////---------
//////---------

//create array to put new groups into
$scope.groups = [];

$scope.status = '';
//submit function to add group
$scope.submit = function(){
  console.log( 'submit clicked' );

//forms object with new group info
  var newGroup = {
    groupName: $scope.groupNameIn,
    groupURL: $scope.groupUrlIn,
    groupContact: $scope.contactNameIn
  };

  console.log( 'group submitted: ', newGroup);

//this doesnt work yet 7/21/16
  groupFactory.submit( newGroup )
  .then(function(response){
    // console.log( 'group submitted: ', newGroup);
    $scope.status = 'group submitted successfully!';
    $scope.groups.push(newGroup);
  }, function(error){
    $scope.status = 'swing and a miss';

  }
);

};//end of submit

}]); //end adminController
