angular.module('Authorization', ['satellizer']).

controller('LoginCtrl', ['$scope', '$auth', '$state', '$location',
  function($scope, $auth, $state, $location, $authProvider) {

  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;
  // if ($scope.isAuthenticated) {
  //   $scope.currentUser = $auth.getPayload().username;
  //   $scope.isAdmin = $auth.getPayload().admin;
  //   console.log($scope.isAdmin);
  // }

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

  console.log($scope.isAuthenticated);

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
      })
      .catch(function (response) {
      });
  };

  $scope.logout = function () {
    $auth.logout();
    $state.go('home');
  };
}
]);
