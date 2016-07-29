myApp.controller( 'HomeController', ['$scope', '$http', '$location', 'groupFactory',
function( $scope, $http, $location, groupFactory){
console.log( 'loaded homeController');

$scope.techStr = '';

$scope.changeTechStr =  function(tech) {
  console.log(tech);
  var sub = $scope.techStr.indexOf(tech.Technology);
  console.log(sub);
  if (sub == -1) {
    $scope.techStr += ' ' + tech.Technology + ' ';
  } else {
    var newStr = $scope.techStr.replace(tech.Technology, "");
    console.log(newStr);
    $scope.techStr = newStr;
  }
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

$scope.techs = {"Technologies":
[
  {
    "Technology": ".NET",
    "Skills": [
      {
        "Skill": "App Development",
        "Subskills": ["Windows Communication Foundation",
          "Windows Forms", "Windows Phone",
          "Windows Presentation Foundation",
          "WinRT/Windows 8"]
      }
    ]
    },
    {
      "Technology": "CMS",
      "Skills": [
        {
          "Skill": "Ektron",
          "Subskills": ""
        },
        {
          "Skill": "Kentico",
          "Subskills": ""
        },
        {
          "Skill": "Sharepoint",
          "Subskills": ""
        },
        {
          "Skill": "Sitecore",
          "Subskills": ""
        },
        {
          "Skill": "Sitefinity",
          "Subskills": ""
        },
        {
          "Skill": "Umbraco",
          "Subskills": ""
        }
      ]
    },
    {
      "Technology": "Frameworks",
      "Skills": [
        {
          "Skill": "ASP.Net",
          "Subskills": ["ASP.Net MVC", "ASP.Net Web API", "ASP.Net WebForms",
            "SignalR"]
        },
        {
          "Skill": ["Compact Framework", "Silverlight"]
        }
      ]
    }
  ]
};


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
