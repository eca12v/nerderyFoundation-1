angular.module('Authorization', ['satellizer']).

controller('LoginCtrl', ['$scope', '$auth', '$location',
  function($scope, $auth, $location) {

  $scope.isAuthenticated = $auth.isAuthenticated();

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
