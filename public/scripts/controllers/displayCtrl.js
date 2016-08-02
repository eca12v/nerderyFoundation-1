myApp.controller( 'DisplayCtrl', ['groupFactory', '$scope', '$http', '$routeParams', '$location', '$rootScope', function( $scope, $http, $location, groupFactory, $rootScope, $routeParams ){
console.log( 'loaded DisplayController');

groupFactory.getGroup($routeParams.groupName).then(function(response) {
  $scope.group = response.data;
  console.log($scope.group);

});




}]); //end displayController
