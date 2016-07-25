angular.module('Authorization', ['satellizer']).

controller('LoginCtrl', ['$scope', '$auth', '$location',
  function($scope, $auth, $location, $authProvider) {

  $scope.isAuthenticated = $auth.isAuthenticated();

  $scope.currentUser = $auth.getPayload();

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

  console.log($scope.isAuthenticated);

  $scope.signUp = function () {
    $auth
      .signup({username: $scope.username, email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $location.path('/home');
      })
      .catch(function (response) {
      });
  };

  $scope.login = function () {
    $auth
      .login({username: $scope.username, email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $location.path('/home');
      })
      .catch(function (response) {
      });
  };

  $scope.logout = function () {
    $auth.logout();
    $location.path('/home');
  };
}
]);
