angular.module('Authorization', ['satellizer', 'toastr']).

controller('LoginCtrl', ['$scope', '$auth', '$state', '$location',
  function($scope, $auth, $state, $location, $authProvider) {

  console.log(toastr);
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response) {
          $state.go('home');
          toastr.info("You logged in successfully.");
        })
        .catch(function(response) {
          toastr.info("Could not login.");
        });
    };

  $scope.signUp = function () {
    $auth
      .signup({username: $scope.username, email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('home');

      })
      .catch(function (response) {
      });
  };

  $scope.login = function () {
    $auth
      .login({username: $scope.username, email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);

        $state.go('home');
        toastr.info("You logged in successfully.");
      })
      .catch(function (response) {
      });
  };

  $scope.logout = function () {
    $auth.logout();
    $state.go('home');
    toastr.info("You logged out successfully.");
  };
}
]);
