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
	});
}]); //end controller
