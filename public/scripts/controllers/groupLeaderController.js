console.log('group leader cont has arrived');
myApp.controller( 'GroupLeaderController', ['$scope', '$http', '$location', '$rootScope', 'grouApp', function( $scope, $http, $location, $rootScope, groupApp ){
console.log( 'loaded GroupLeaderController');

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
//this doesnt work yet 7/21/16
//   GroupFactory.submit( newGroup )
//   .then(function(response){
//     console.log( 'group submitted');
//     $scope.status = 'group submitted successfully!';
//     $scope.group.push(newGroup);
//   }, function(error){
//     $scope.status = 'swing and a miss';
//
//   }
// );

};//end of submit

}]); //end adminController
