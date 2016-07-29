myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$routeParams', function( $scope, $http, $location, $rootScope, groupFactory, $routeParams ){

  groupFactory.getGroup($routeParams.groupName).then(function(response) {
		$scope.group = response.data;
    console.log($scope.group);
	});

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
    contact: $scope.contactNameIn,
    contactEmail: $scope.contactEmail,
    description: $scope.description,
    location: $scope.location,
    activities:$scope.activities,
    technologies: $scope.technologies,
    tags: self.roTagNames,
    freqOfMeeting: $scope.freqOfMeeting,
    sizeOfMeeting: $scope.sizeOfMeeting,
    affiliations: $scope.affiliations,
    affiliationURL: $scope.affiliationURL,
    eventInfo: $scope.eventInfo,
    sizeOfMembership: $scope.sizeOfMembership
  };

  console.log( 'updatedGroup: ', updatedGroup );
  groupFactory.editGroup(id).then(function(response){
    $scope.group = response.data;
    console.log( 'in edit groups in group controller, $scope.data: ', $scope.data );
  });
};
}]); //end controller
