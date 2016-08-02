

myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$stateParams', '$mdSidenav', '$log', function( $scope, $http, $location, $rootScope, groupFactory, $stateParams, $mdSidenav, $log ){
$scope.groupDisplayed = [];
  groupFactory.getGroup($stateParams.name).then(function(response) {
		$scope.group = response.data;
    $scope.groupDisplayed.push ($scope.group);
    console.log('in GroupController, $scope.group: ', $scope.group);
    console.log('in GroupController, $scope.groupDisplayed: ', $scope.groupDisplayed);


//-----------------------------------------------------------------------
$scope.toggleLeft = buildDelayedToggler('left');
$scope.toggleRight = buildToggler('right');
$scope.isOpenRight = function(){
  return $mdSidenav('right').isOpen();
  };
 function buildDelayedToggler(navID) {
       return debounce(function() {
         // Component lookup should always be available since we are not using `ng-if`
         $mdSidenav(navID)
           .toggle()
           .then(function () {
             $log.debug("toggle " + navID + " is done");
           });
       }, 200);
     }
     function buildToggler(navID) {
     return function() {
       // Component lookup should always be available since we are not using `ng-if`
       $mdSidenav(navID)
         .toggle()
         .then(function () {
           $log.debug("toggle " + navID + " is done");
         });
     };
   }
function debounce(func, wait, context) {
  var timer;
  return function debounced() {
    var context = $scope,
        args = Array.prototype.slice.call(arguments);
    $timeout.cancel(timer);
    timer = $timeout(function() {
      timer = undefined;
      func.apply(context, args);
    }, wait || 10);
  };
}
//-------------------------------------------------------------------
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
    console.log( 'index: ', index );
    var groupToDelete = index;
    console.log('groupToDelete: ', groupToDelete);
    groupFactory.deleteGroup( groupToDelete ).then(function(response){
      $scope.group = response.data;
      $scope.close();
      console.log( 'in edit groups in group controller, $scope.data: ', $scope.group );
    });
  };

  // FIX THE CHIPS !----------------------------------------
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
//--------------------------------------------------------------
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
    $scope.close();
    console.log( 'in edit groups in group controller, $scope.data: ', $scope.group );

  });
};//end of editGroup

$scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };


}]); //end controller
