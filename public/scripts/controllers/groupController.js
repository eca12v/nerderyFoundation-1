myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$routeParams', function( $scope, $http, $location, $rootScope, groupFactory, $routeParams ){

  groupFactory.getGroup($routeParams.groupName).then(function(response) {
		$scope.group = response.data;
    console.log($scope.group);
	});

  //  console.log( $scope.group.name );
  $scope.membershipSizes = [
          "0-25",
          "25-50",
          "50-100",
          "100-500"
      ];

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

  // $scope.approve = function(id, index) {
  //   console.log(id);
  //   groupFactory.approveGroup(id);
  //   $scope.groups.splice(index, 1);
  // };


  $scope.edit = function(id, index){
    console.log('edit clicked, id: ', id);
    event.preventDefault();

  var updatedGroup = {
    name: $scope.group.name,
    groupURL: $scope.groupUrlIn,
    contact: $scope.group.groupContact,
    contactEmail: $scope.group.contactEmail,
    description: $scope.group.description,
    location: $scope.group.location,
    activities:$scope.group.activities,
    technologies: $scope.group.technologies,
    tags: self.roTagNames,
    freqOfMeeting: $scope.group.freqOfMeeting,
    sizeOfMeeting: $scope.group.sizeOfMeeting,
    affiliations: $scope.group.affiliations,
    affiliationURL: $scope.group.affiliationURL,
    eventInfo: $scope.group.eventInfo,
    sizeOfMembership: $scope.group.sizeOfMembership
  };

  console.log( 'updatedGroup: ', updatedGroup );
  groupFactory.editGroup( id, updatedGroup ).then(function(response){
    $scope.group = response.data;
    console.log( 'in edit groups in group controller, $scope.data: ', $scope.group );
  });
};
}]); //end controller
