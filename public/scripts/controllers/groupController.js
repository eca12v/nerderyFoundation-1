nerderyApp.controller( 'GroupController', ['$scope', '$http', 'groupFactory', '$state', '$stateParams', '$mdSidenav', '$log', '$auth', '$mdDialog', '$mdMedia', '$filter', function( $scope, $http, groupFactory, $state, $stateParams, $mdSidenav, $log, $auth, $mdDialog, $mdMedia, $filter ){
	// authorization methods
	$scope.isAuthenticated = $auth.isAuthenticated;
	$scope.currentUser = $auth.getPayload;
	// get group info from stateparamtere
	groupFactory.getGroup($stateParams.groupName).then(function(response) {
			$scope.group = response.data;
			// if group has a photo associated with it
			if($scope.group.photoURL) {
				$scope.titleImage = $scope.group.photoURL;
			} else {
				// use a default image
				$scope.titleImage = '../images/startup-photos-medium.jpg';
			}
  });
	// sidebar stuff
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.isOpenRight = function(){
	  return $mdSidenav('right').isOpen();
	};
	// sidebar helper methods
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

	//create array to put new groups into
	$scope.groups = [];
  //  console.log( $scope.group.name );

	$scope.status = '';

	$scope.sizeOfMembershipArray = [
	      "0-25",
	      "25-50",
	      "50-100",
	      "100-500"
	  ];
	$scope.freqOfMeetingArray = [
		    "Weekly",
				"Biweekly",
				"Monthly",
				"Quarterly",
				"Annually"
	  ];
	$scope.sizeOfMeetingArray = [
	      "0-25",
	      "25-50",
	      "50-100",
	      "100-500"
	];
	// edit function
	$scope.edit = function(id, index){
	  event.preventDefault();
		// update group object
	  var updatedGroup = {
	    name: $scope.group.name,
	    groupURL: $scope.group.groupURL,
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
		// send new group info to factory
	  groupFactory.editGroup( id, updatedGroup ).then(function(response){
	    $scope.updatedGroup = response.data;
	    $scope.close();
	  });
	};//end of editGroup


	// DELETES GROUP AFTER SHOW CONFIRM, REDIRECTS BACK TO HOME
	$scope.confirmDelete = function( id, index ) {
		console.log( 'confirmDelete clicked');
		swal({
		 title: "Are you sure?",
		 text: "This cannot be undone!",
		 type: "warning",
		 showCancelButton: true,
		 confirmButtonColor: "#3F51B5",
		 confirmButtonText: "Yes, delete it!",
		 closeOnConfirm: false,
		 closeOnCancel: false
	 },
		function(isConfirm){
			if(isConfirm){
			$scope.delete( id, index );
			console.log( 'after $scope.delete, id: ', id);
			$scope.close();
			swal("Your group has been deleted");
			$state.go('home');

		} else {
			swal("Cancelled");
		}
		}
	);
	};

  $scope.delete = function(id, index){
		console.log( 'delete clicked, id: ', id);
		// send delete request to the factory
    groupFactory.deleteGroup( id ).then(function(response){
      $state.go('home');
    });
  };
	// cancel
	$scope.cancel = function(){
	  $scope.close();
	  $state.go('group');

	};
	// close
	$scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
	// popup dialog helper methods
	$scope.status = '  ';
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	$scope.showAlert = function(ev) {
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
	// confirmation dialog
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
	 }, function() {
	  //  $scope.status = 'You have not approved this group yet';
	 });
	};
}]); //end controller
