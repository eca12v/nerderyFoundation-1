console.log('group leader cont has arrived');


myApp.controller( 'GroupLeaderController',  [ 'groupFactory', '$scope', '$http', '$location', '$rootScope', 'Upload',  function( groupFactory, $scope,  $http, $location, $authProvider, $rootScope, Upload ){


console.log( 'loaded GroupLeaderController');
// $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
//////---------
//////---------

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

//global for uploading functions
$scope.file = '';
$scope.uploads = [];

//submit function to add group
$scope.submit = function(){
  console.log( 'submit clicked' );
  console.log('file: ', $scope.file);
  if($scope.form.file.$valid && $scope.file){
    $scope.upload($scope.file);
    console.log('in submit function');
    // $scope.postGroup();
  }
  // else{$scope.postGroup();}
}; //end submit function

$scope.upload = function(file){
  Upload.upload({
    url: '/groups/uploads',
    data: {
      file: file,
      'groupName': $scope.groupNameIn
    }
  });
// }; //end upload function

// $scope.postGroup = function(){
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
    tags: $scope.tags,
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

  });


};//end of postGroup

}]); //end adminController
