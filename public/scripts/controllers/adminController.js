nerderyApp.controller( 'AdminController', ['$scope', '$http', 'groupFactory', '$mdDialog', '$mdMedia', function( $scope, $http, groupFactory, $mdDialog, $mdMedia ){
  // populate unapproved groups queue
  groupFactory.getUnapprovedGroups().then(function(response) {
		$scope.groups = response.data;
	});
  // populate flagged groups queue
  groupFactory.getFlaggedGroups().then(function(response) {
    $scope.flaggedGroups = response.data;
  });
  // approve a group and remove from unapproved queue
  $scope.approve = function(id, index) {
    groupFactory.approveGroup(id);
    $scope.groups.splice(index, 1);
  };
  // unflag a group and remove from flagged queue
  $scope.unFlag = function(id, index) {
    groupFactory.unFlagGroup(id);
    $scope.flaggedGroups.splice(index, 1);
  };
  // delete a group
  $scope.delete = function(id, index, panel){
    groupFactory.deleteGroup( id ).then(function(response){
      // if group was in the flagged queue remove it from that queue
      if (panel == 'flagged') {
        $scope.flaggedGroups.splice(index, 1);
      } else {
        // if the group was in the unapproved queue remove it from that queue
        $scope.groups.splice(index, 1);
      }
    });
  };
  // pop up alert helper method
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


  $scope.showConfirm = function(ev, action, actionDesc, id, index) {
 var confirm = $mdDialog.confirm()
       .title('Would you like to ' + actionDesc + ' this group?')
       .textContent()
       .ariaLabel()
       .targetEvent(ev)
       .ok('Yes')
       .cancel('No');
 $mdDialog.show(confirm).then(function() {
   if (action == 'Approve') {
     groupFactory.approveGroup(id);
     $scope.groups.splice(index, 1);
   } else if (action == "deleteApprove") {
     groupFactory.deleteGroup( id ).then(function(response){
       $scope.groups.splice(index, 1);
     });
   } else if (action == 'unFlagGroup') {
     groupFactory.unFlagGroup(id);
     $scope.flaggedGroups.splice(index, 1);
   } else if (action == 'deleteFlag') {
     groupFactory.deleteGroup( id ).then(function(response){
       $scope.flaggedGroups.splice(index, 1);
     });
   }
 }, function() {
 });
};
}]); //end adminController
