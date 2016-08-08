nerderyApp.controller('LoginCtrl', ['$scope', '$auth', '$state', '$location',
function($scope, $auth, $state, $location, $authProvider) {

  // authorization methods
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;
  // oauth/sateillzer methods
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      $state.go('addGroup');
    }).catch(function(response) {
      toastr.info("Could not login.");
    });
  };


  // admin login function
  $scope.login = function () {
    $auth.login({username: $scope.username, email: $scope.email, password: $scope.password}).then(function (response) {
      $auth.setToken(response);
      $state.go('admin');
    }).catch(function (response) {
    });
  };
  // logout function
  $scope.logout = function () {
    $auth.logout();
    $state.go('home');
  };
  $scope.show=false;
}]);
