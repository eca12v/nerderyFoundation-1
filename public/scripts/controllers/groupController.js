myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$routeParams', function( $scope, $http, $location, $rootScope, groupFactory, $routeParams ){
$scope.groupDisplayed = [];
  groupFactory.getGroup($routeParams.name).then(function(response) {
		$scope.group = response.data;
    $scope.groupDisplayed.push ($scope.group);
    console.log('in GroupController, $scope.group: ', $scope.group);
    console.log('in GroupController, $scope.groupDisplayed: ', $scope.groupDisplayed);



  var self = this;
  self.readonly = false;
  self.selectedItem = null;
  self.searchText = null;
  self.querySearch = querySearch;
  self.technologies = loadTechnologies();
  self.selectedTech = [];
  self.roSelectedTech = angular.copy(self.selectedTech);
  self.autocompleteDemoRequireMatch = true;
  self.transformChip = transformChip;
  self.tagNames = ['Beer', 'Pizza'];
  self.roTagNames = angular.copy(self.tagNames);
  /**
   * Return the proper object when the append is called.
   */
  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { name: chip, type: 'new' };
  }
  /**
   * Search for Tech.
   */
  function querySearch (query) {
    var results = query ? self.technologies.filter(createFilterFor(query)) : [];
    return results;
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(vegetable) {
      return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
          (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
    };
  }
  function loadTechnologies() {
    var veggies = [
      {
        'name': 'AngularJS',
        'type': 'Javascript'
      },
      {
        'name': 'Node.js',
        'type': 'Javascript'
      },
      {
        'name': '.NET',
        'type': 'Web Technology'
      },
      {
        'name': 'SASS',
        'type': 'CSS'
      },
      {
        'name': 'Blah',
        'type': 'Blah'
      }
    ];
    return veggies.map(function (veg) {
      veg._lowername = veg.name.toLowerCase();
      veg._lowertype = veg.type.toLowerCase();
      return veg;
    });
  }

//create array to put new groups into
$scope.groups = [];
  //  console.log( $scope.group.name );

$scope.status = '';
	});
$scope.sizeOfMembership = [
        "0-25",
        "25-50",
        "50-100",
        "100-500"
  ];
$scope.freqOfMeeting = [
        "0-25",
        "25-50",
        "50-100",
        "100-500"
  ];
$scope.sizeOfMeeting = [
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
  var self = this;
  self.readonly = false;

  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { name: chip, type: 'new' };
  }

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
