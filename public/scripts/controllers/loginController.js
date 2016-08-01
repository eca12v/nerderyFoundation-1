angular.module('Authorization', ['satellizer', 'toastr']).

controller('LoginCtrl', ['$scope', '$auth', '$state', '$location', 'toastr',
  function($scope, $auth, $state, $location, $authProvider, toastr) {

  console.log(toastr);
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
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
        toastr.success(
          'Succesfully logined in!',
          {closeButton: true}
        );

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
