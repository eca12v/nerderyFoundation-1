myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

//$scope.filterStr = "Monthly";

groupFactory.getApprovedGroups().then(function(response) {
  $scope.groups = response.data;
  console.log($scope.groups);
});


// DOESN'T WORK YET/////////////////

$http({
  method: "GET",
  url: '/tech.json',
})
.then(function (response) {
  $scope.tech = response.data;
  console.log($scope.tech);
}, function myError(response) {
  $scope.tech = response.statusText;
});//End of http call


}]); //end homeController
