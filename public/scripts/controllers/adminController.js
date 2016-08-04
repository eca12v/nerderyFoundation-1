myApp.controller( 'AdminController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$mdDialog', '$mdMedia', function( $scope, $http, $location, $rootScope, groupFactory, $mdDialog, $mdMedia ){
console.log( 'loaded AdminController');

  $scope.unapprovedGroups = groupFactory.getUnapprovedGroups();
  console.log($scope.unapprovedGroups);

  groupFactory.getUnapprovedGroups().then(function(response) {
		$scope.groups = response.data;
    console.log($scope.groups);
	});

  groupFactory.getFlaggedGroups().then(function(response) {
    $scope.flaggedGroups = response.data;
    console.log($scope.flaggedGroups);
  });

  $scope.approve = function(id, index) {
    console.log(id);
    groupFactory.approveGroup(id);
    $scope.groups.splice(index, 1);
  };

  $scope.unFlag = function(id, index) {
    console.log(id);
    groupFactory.unFlagGroup(id);
    $scope.flaggedGroups.splice(index, 1);
  };

  $scope.delete = function(id, index, panel){
    console.log( 'delete clicked, index: ', id );
    groupFactory.deleteGroup( id ).then(function(response){
      console.log('Succesfully deleted');
      if (panel == 'flagged') {
        $scope.flaggedGroups.splice(index, 1);
      } else {
        $scope.groups.splice(index, 1);
      }
    });
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

  $scope.showConfirm = function(ev, action, actionDesc, id, index) {
   // Appending dialog to document.body to cover sidenav in docs app
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
    //  $scope.status = 'You have not approved this group yet';
   });
 };

}]); //end adminController
