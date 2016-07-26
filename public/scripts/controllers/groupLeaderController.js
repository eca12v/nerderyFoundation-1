console.log('group leader cont has arrived');

myApp.controller( 'GroupLeaderController', [ 'groupFactory', '$scope', '$http', '$location', '$rootScope',  function( groupFactory, $scope,  $http, $location, $rootScope ){

console.log( 'loaded GroupLeaderController');

//////---------
//////---------

//create array to put new groups into
$scope.groups = [];

$scope.status = '';

//deletes group 
$scope.banana = function(index){
  var groupToDelete = $scope.groups[index];
  console.log('groupToDelete: ', groupToDelete);
  var groupId = groupToDelete._id;
console.log('grouId: ', groupId);
  $http({
     method: 'DELETE',
     url: '/groups/deleteGroup/' + groupId,
   });
  $scope.groups.splice(index, 1);
};



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

//
  groupFactory.submit( newGroup )
  .then(function(response){
    // console.log( 'group submitted: ', newGroup);
    console.log('response: ', response.data);
    $scope.status = 'group submitted successfully!';
    $scope.groups.push(response.data);
  }, function(error){
    $scope.status = 'swing and a miss';

  }
);

};//end of submit

}]); //end adminController
