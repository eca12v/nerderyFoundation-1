nerderyApp.controller( 'AddGroupController',  [ 'Upload', 'groupFactory', '$scope', '$http', '$state', '$rootScope', '$auth', function( Upload, groupFactory, $scope, $http, $state, $rootScope, $auth ){
  // authentication methods
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;
  // variables and methods for tags and autocomplete chips
  var self = this;
  self.readonly = false;
  self.selectedItem = null;
  self.searchText = null;
  self.querySearch = querySearch;
  self.selectedTech = [];
  self.roSelectedTech = angular.copy(self.selectedTech);
  self.autocompleteDemoRequireMatch = true;
  self.transformChip = transformChip;
  self.tagNames = [];
  self.roTagNames = angular.copy(self.tagNames);
  // inject techList object into controller
  $http({
    method: "GET",
    url: '/techTag.json',
  })
  .then(function (response) {
    $scope.techList = response.data;
    // if techList succesfully retrieved, load into filtering mechanism
    self.technologies = loadTechnologies();
  }, function myError(response) {
    console.log('techTag error');
    $scope.techList = response.statusText;
  });//End of http call
  // chip helper method
  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { name: chip, type: 'new' };
  }
  // autocomplete filtering method
  function querySearch (query) {
    var results = query ? self.technologies.filter(createFilterFor(query)) : [];
    return results;
  }
  // autocomplete filtering method
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(tech) {
      return (tech._lowername.indexOf(lowercaseQuery) === 0);
    };
  }
  // load techList into autocomplete filtering mechanism
  function loadTechnologies() {
    return $scope.techList.map(function (tech) {
      tech._lowername = tech.Technologies.toLowerCase();
      return tech;
    });
  }
  //create array to put new groups into
  $scope.groups = [];
  // scoped arrays to populate drop down menus
  $scope.locations = [
    "Minneapolis - St. Paul",
    "Duluth - Superior",
    "Fargo - Valley City, ND",
    "Sioux Falls(Mitchell), SD",
    "Mankato",
    "Rochester - Mason City - Austin, MN - IA",
    "La Crosse - Eau Claire, WI"
  ];
  $scope.activityList = [
    "Networking",
    "Education",
    "Hands-On"
  ];
  $scope.membershipSizes = [
    "0-10",
    "10-25",
    "25-50",
    "50-100",
    "100-500",
    "500+"
  ];
  $scope.meetingSizes = [
    "0-10",
    "10-25",
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
  //global for uploading functions
  $scope.file = '';
  $scope.uploads = [];
  //submit function to add group
  $scope.submit = function(){
    // create arrays to contain tech tag info
    $scope.techList = [];
    $scope.coreTech = [];
    // popualate said arrays
    for (var each in self.selectedTech) {
      $scope.techList.push(self.selectedTech[each].Technologies);
      $scope.coreTech.push(self.selectedTech[each].coreTechnologies);
    }
    // if a file is uploaded call upload else call postGroup
    if($scope.form.file.$valid && $scope.file){
      $scope.upload($scope.file);
    }else{
      $scope.postGroup();
    }
  }; //end submit function
  // create group function with uploaded file
  $scope.upload = function(file){
    Upload.upload({
      url: '/groups/createGroup',
      data: {
        file: file,
        name: $scope.groupName,
        groupURL: $scope.groupURL,
        contact: $scope.contactName,
        contactEmail: $scope.contactEmail,
        description: $scope.description,
        location: $scope.location,
        activities:$scope.activities,
        technologies: $scope.techList,
        coreTechnologies: $scope.coreTech,
        tags: $scope.tags,
        freqOfMeeting: $scope.freqOfMeeting,
        sizeOfMeeting: $scope.sizeOfMeeting,
        affiliations: $scope.affiliations,
        affiliationURL: $scope.affiliationURL,
        eventInfo: $scope.eventInfo,
        sizeOfMembership: $scope.sizeOfMembership,
        submitterID: $scope.currentUser()._id
      }
    }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
              $state.go('home');
              toastr.info("Your group was creating and is awaiting admin approval.");
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
  }; //end upload function
  // create group function without uploaded file
  $scope.postGroup = function(){
  // //forms object with new group info
    var newGroup = {
      name: $scope.groupName,
      groupURL: $scope.groupURL,
      contact: $scope.contactName,
      contactEmail: $scope.contactEmail,
      description: $scope.description,
      location: $scope.location,
      activities:$scope.activities,
      technologies: $scope.techList,
      coreTechnologies: $scope.coreTech,
      tags: self.roTagNames,
      freqOfMeeting: $scope.freqOfMeeting,
      sizeOfMeeting: $scope.sizeOfMeeting,
      affiliations: $scope.affiliations,
      affiliationURL: $scope.affiliationURL,
      eventInfo: $scope.eventInfo,
      sizeOfMembership: $scope.sizeOfMembership,
      submitterID: $scope.currentUser()._id
    };
    // send new group object to factory
    groupFactory.submit( newGroup ).then(function(response){
      $scope.groups.push(response.data);
      $state.go('home');
      swal("Your group was created and is awaiting admin approval");
      toastr.info("Your group was created and is awaiting admin approval.");
      }, function(error){
      $scope.status = 'swing and a miss';
    });
  };//end of postGroup
}]); //end adminController
