console.log('group leader cont has arrived');


myApp.controller( 'GroupLeaderController',  [ 'Upload', 'groupFactory', '$scope', '$http', '$location', '$rootScope',   function( Upload, groupFactory, $scope,  $http, $location, $authProvider, $rootScope  ){


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
  console.log('group name: ', $scope.groupNameIn);
  console.log( 'Upload', Upload );
  if($scope.form.file.$valid && $scope.file){
    $scope.upload($scope.file);
    console.log('in submit function');
    // $scope.postGroup();
  }
  // else{$scope.postGroup();}
}; //end submit function

$scope.upload = function(file){
  console.log( 'in uploader:', file );
  console.log( 'Upload', Upload );
  Upload.upload({
    url: '/groups/uploads',
    data: {
      file: file,
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
    }
  }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

}; //end upload function

$scope.postGroup = function(){
// //forms object with new group info
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
