myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

$scope.techStr = '';

$scope.changeTechStr =  function(tech) {
  $scope.techStr += ' ' + tech + ' ';
};
// $scope.techFilter = function() {
//   return $scope.Biweekly && $scope.Stuff;
// };

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


}]) //end homeController

.filter("multiWordFilter", function($filter){
    return function(inputArray, searchText){
        var wordArray = searchText ? searchText.toLowerCase().split(/\s+/) : [];
        var wordCount = wordArray.length;
        for(var i=0;i<wordCount;i++){
            inputArray = $filter('filter')(inputArray, wordArray[i]);
        }
        return inputArray;
    };
});
