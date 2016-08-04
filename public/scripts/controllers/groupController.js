myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$state', '$stateParams', '$mdSidenav', '$log', '$auth', '$mdDialog', '$mdMedia', function( $scope, $http, $location, $rootScope, groupFactory, $state, $stateParams, $mdSidenav, $log, $auth, $mdDialog, $mdMedia ){

$scope.isAuthenticated = $auth.isAuthenticated;
$scope.currentUser = $auth.getPayload;

$scope.groupDisplayed = [];
groupFactory.getGroup($stateParams.groupName).then(function(response) {
		$scope.group = response.data;
    $scope.groupFlags = $scope.group.flags;
    $scope.groupDisplayed.push ($scope.group);
    console.log('in GroupController, $scope.group: ', $scope.group);
    console.log('in GroupController, $scope.groupDisplayed: ', $scope.groupDisplayed);
  });


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


//create array to put new groups into
$scope.groups = [];
  //  console.log( $scope.group.name );

$scope.status = '';

$scope.sizeOfMembership = [
      "0-25",
      "25-50",
      "50-100",
      "100-500"
  ];
$scope.freqOfMeeting = [
	    "weekly",
			"biweekly",
			"monthly",
			"quarterly",
			"annually"
  ];
$scope.sizeOfMeeting = [
      "0-25",
      "25-50",
      "50-100",
      "100-500"
];


  // FIX THE CHIPS !----------------------------------------
  // var self = this;
  // self.readonly = false;
  //
  // function transformChip(chip) {
  //   // If it is an object, it's already a known chip
  //   if (angular.isObject(chip)) {
  //     return chip;
  //   }
  //   // Otherwise, create a new one
  //   return { name: chip, type: 'new' };
  // }
//--------------------------------------------------------------
$scope.edit = function(id, index){
  console.log('edit clicked, id: ', id);
  event.preventDefault();

  var updatedGroup = {
    name: $scope.group.name,
    groupURL: $scope.group.groupUrlIn,
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

// DELETES GROUP AFTER SHOW CONFIRM, REDIRECTS BACK TO HOME
$scope.confirmDelete = function(ev, id, index ) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .textContent('This cannot be undone')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('I am sure I want to delete')
          .cancel('Never Mind');
    $mdDialog.show(confirm).then(function() {
      $scope.delete(id, index);
    }, function() {
      $scope.close();
      $state.go('group');
    });
  };
  $scope.delete = function(id, index){
    console.log( 'delete clicked, index: ', id );
    groupFactory.deleteGroup( id ).then(function(response){
      $state.go('home');
      console.log( 'in delete groups in group controller, $scope.data: ', $scope.group );
    });
  };


$scope.cancel = function(){
  console.log( 'cancel clicked' );
  $scope.close();
  $state.go('group');
};
// CLOSES SIDENAV, CALLED INSIDE EDIT FUNCTION
$scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

$scope.flagGroup = function() {
  groupFactory.flagGroup($scope.group._id);
  $scope.groupFlags++;
};

$scope.status = '  ';
$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
$scope.showAlert = function(ev) {
  // Appending dialog to document.body to cover sidenav in docs app
  // Modal dialogs should fully cover application
  // to prevent interaction outside of dialog
  $mdDialog.show(
    $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('This is an alert title')
      .textContent('You can specify some description text in here.')
      .ariaLabel('Alert Dialog Demo')
      .ok('Got it!')
      .targetEvent(ev)
  );
};

$scope.showConfirm = function(ev) {
 // Appending dialog to document.body to cover sidenav in docs app
 var confirm = $mdDialog.confirm()
       .title('Would you like to flag this group?')
       .textContent('Is the information displayed either incorrect or inappropriate?  Let an admin know.')
       .ariaLabel()
       .targetEvent(ev)
       .ok('Yes')
       .cancel('No');
 $mdDialog.show(confirm).then(function() {
   groupFactory.flagGroup($scope.group._id);
   $scope.groupFlags++;
 }, function() {
  //  $scope.status = 'You have not approved this group yet';
 });
};



// CONFIRM DELETE POPUP
$scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');



}]); //end controller
