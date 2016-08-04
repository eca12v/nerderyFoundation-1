myApp.controller( 'AdminController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', function( $scope, $http, $location, $rootScope, groupFactory ){
console.log( 'loaded AdminController');

  $scope.unapprovedGroups = groupFactory.getUnapprovedGroups();
  console.log($scope.unapprovedGroups);

  groupFactory.getUnapprovedGroups().then(function(response) {
		$scope.groups = response.data;
    console.log($scope.groups);
	});

  groupFactory.getFlaggedGroups().then(function(response) {
    $scope.flaggedGroups = response.data;
    console.log($scope.groups);
  });

  $scope.approve = function(id, index) {
    console.log(id);
    groupFactory.approveGroup(id);
    $scope.groups.splice(index, 1);
  };

  $scope.unFlag = function(id, index) {
    console.log(id);
    groupFactory.unFlagGroup(id);
    $scope.flaggedGroups.splice(index, 1);
  };

  $scope.delete = function(id, index, panel){
    console.log( 'delete clicked, index: ', id );
    groupFactory.deleteGroup( id ).then(function(response){
      console.log('Succesfully deleted');
      if (panel == 'flagged') {
        $scope.flaggedGroups.splice(index, 1);
      } else {
        $scope.groups.splice(index, 1);
      }
    });
  };

}]); //end adminController
