console.log('group leader cont has arrived');

myApp.controller( 'GroupLeaderController',  [ 'groupFactory', '$scope', '$http', '$location', '$rootScope',  function( groupFactory, $scope,  $http, $location, $authProvider, $rootScope ){

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

function DemoCtrl () {
    var self = this;

    self.readonly = false;

    // Lists of fruit names and Vegetable objects
    self.techNames = ['Angular', 'jQuery', 'JavaScript'];
    self.roTechNames = angular.copy(self.techNames);
    self.editableTechNames = angular.copy(self.techNames);

    self.tags = [];
    self.techObjs = [
      {
        'name' : 'jQuery',
      },
      {
        'name' : 'Java',
      },
      {
        'name' : '',
      }
    ];

    self.newTech = function(chip) {
      return {
        name: chip,
        type: 'unknown'
      };
    };
  }

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

  }
);

};//end of submit
$scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043'
    };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });

}]); //end adminController
