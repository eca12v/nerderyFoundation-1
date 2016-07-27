myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

groupFactory.getApprovedGroups().then(function(response) {
  $scope.groups = response.data;
  console.log($scope.groups);
});


//DOESN'T WORK YET/////////////////

// $http.get({
//   method: "GET",
//   url: '/public/tech.json',
// })
// .then(function (response) {
//   $scope.tech = response.data;
//   console.log($scope.tech);
// }, function myError(response) {
//   $scope.tech = response.statusText;
// });//End of http call


}]); //end homeController
