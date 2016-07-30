myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

<<<<<<< HEAD
$scope.selectedTech = '';
$scope.selectedSubTech = '';
$scope.techStr = '';
$scope.overallTechStr = '';

$scope.changeOverallTech = function(tech) {
  console.log('overallchangeTech hit');
  console.log(tech);
  $scope.selectedTech = tech;
  // console.log(tech.Skills);
  if ($scope.techStr) {
    $scope.techStr = '';
    $scope.techStr += tech + ' ';
  } else {
    $scope.techStr += tech + ' ';
  }
};

$scope.changeTechStr =  function(tech) {
  console.log('changeTech hit');
  console.log(tech);
  // console.log(tech.Skills);
  var sub = $scope.techStr.indexOf(tech);
  console.log(sub);
  if (sub == -1) {
    $scope.selectedSubTech = tech;
    $scope.techStr += ' ' + tech + ' ';
  } else {
    $scope.selectedSubTech = '';
    var newStr = $scope.techStr.replace(tech, "");
    console.log(newStr);
    $scope.techStr = newStr;
  }
};

$scope.changeSubTechStr =  function(tech) {
  console.log('changeTech hit');
  console.log(tech);
  var sub = $scope.techStr.indexOf(tech);
  console.log(sub);
  if (sub == -1) {
    $scope.techStr += ' ' + tech + ' ';
  } else {
    var newStr = $scope.techStr.replace(tech, "");
    console.log(newStr);
    $scope.techStr = newStr;
  }
};

$scope.location = ['Twin Cities', 'Duluth'];

$scope.typicalSize = ['0-25', '25-50', '50-100', '100-500'];

$scope.changeLocation =  function(location) {
  console.log('changeLocation hit');
  console.log(location);
  var sub = $scope.techStr.indexOf(location);
  console.log(sub);
  if (sub == -1) {
    $scope.techStr += ' ' + location + ' ';
  } else {
    var newStr = $scope.techStr.replace(location, "");
    console.log(newStr);
    $scope.techStr = newStr;
  }
};
=======
//$scope.filterStr = "Monthly";
>>>>>>> traceyz

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
