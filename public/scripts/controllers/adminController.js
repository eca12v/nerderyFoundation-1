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

}]); //end adminController
