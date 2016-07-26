myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

groupFactory.getApprovedGroups().then(function(response) {
  $scope.groups = response.data;
  console.log($scope.groups);
});




}]); //end homeController
