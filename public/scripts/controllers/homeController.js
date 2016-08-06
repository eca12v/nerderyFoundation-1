nerderyApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory', '$auth',
function( $scope, $http, $location, groupFactory, $auth){
  // authorization methods
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.currentUser = $auth.getPayload;
  // poopulate group display with all approved groups
  groupFactory.getApprovedGroups().then(function(response) {
    $scope.groups = response.data;
    // if photo associated with group, use that else use default
    if($scope.groups.photoURL){
      $scope.avatarImage = $scope.groups.photoURL;
    }else{
      $scope.avatarImage = "../images/imgres copy.jpg";
    }
  });
  // retrieve techList to populate filtering options
  $http({
    method: "GET",
    url: '/tech.json',
  })
  .then(function (response) {
    $scope.tech = response.data;
  }, function myError(response) {
    $scope.tech = response.statusText;
  });//End of http call
  // filtering strings
  $scope.selectedTech = '';
  $scope.selectedSubTech = '';
  $scope.techStr = '';
  $scope.overallTechStr = '';
  // select main tech branch
  $scope.changeOverallTech = function(tech) {
    $scope.selectedTech = tech;
    // if existing filtering string clear and add new selection
    if ($scope.techStr) {
      $scope.techStr = '';
      $scope.techStr += tech + ' ';
    } else {
      // add selected tech to filtering string
      $scope.techStr += tech + ' ';
    }
  };
  // add subTech to filtering string
  $scope.changeTechStr =  function(tech) {
    // index of tech
    var sub = $scope.techStr.indexOf(tech);
    // if not present add in
    if (sub == -1) {
      $scope.selectedSubTech = tech;
      $scope.techStr += ' ' + tech + ' ';
    } else {
      // replace subtech with new selection
      $scope.selectedSubTech = '';
      var newStr = $scope.techStr.replace(tech, "");
      $scope.techStr = newStr;
    }
  };
  // add third tier sub tech to search string
  $scope.changeSubTechStr =  function(tech) {
    var sub = $scope.techStr.indexOf(tech);
    // if not present add in
    if (sub == -1) {
      $scope.techStr += ' ' + tech + ' ';
    } else {
      // replace third tier subtech with new selection
      var newStr = $scope.techStr.replace(tech, "");
      $scope.techStr = newStr;
    }
  };
  // change filter location str
  $scope.changeLocation =  function(location) {
    var sub = $scope.techStr.indexOf(location);
    if (sub == -1) {
      $scope.techStr += ' ' + location + ' ';
    } else {
      var newStr = $scope.techStr.replace(location, "");
      $scope.techStr = newStr;
    }
  };
  // arrays to populate filter drop down menus
  $scope.location = [
    "Minneapolis - St. Paul",
    "Duluth - Superior",
    "Fargo - Valley City, ND",
    "Sioux Falls(Mitchell), SD",
    "Mankato",
    "Rochester - Mason City - Austin, MN - IA",
    "La Crosse - Eau Claire, WI"
  ];
  $scope.typicalSize = [
    '0-25', '25-50', '50-100', '100-500'
  ];
  // menu helper functions
  var originatorEv;
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
}]) //end homeController
// custom filter to allow for search words in same string, separated by space
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
