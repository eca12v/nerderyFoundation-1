console.log('group leader cont has arrived');

myApp.controller( 'GroupLeaderController', [ 'groupFactory', '$scope', '$http', '$location', '$rootScope',  function( groupFactory, $scope,  $http, $location, $authProvider, $rootScope ){

  console.log( 'loaded GroupLeaderController');

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
$scope.membershipSizes = [
        "0-25",
        "25-50",
        "50-100",
        "100-500"
    ];

$scope.meetingSizes = [
  "0-25",
  "25-50",
  "50-100",
  "100-500"
];
$scope.meetingFreq = [
  "Weekly",
  "Biweekly",
  "Monthly",
  "Quarterly",
  "Annually"
];


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
  Upload.upload ({
          url: '/uploads',
          data: {
            file: file,
            'user': $scope.user,
            'comment': $scope.comment
          } // end data
        }).then(function(response){

//forms object with new group info
  var newGroup = {

    name: $scope.groupNameIn,
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
});
};//end of submit

}]); //end adminController
