myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$routeParams', function( $scope, $http, $location, $rootScope, groupFactory, $routeParams ){

  groupFactory.getGroup($routeParams.groupName).then(function(response) {
		$scope.group = response.data;
    console.log($scope.group);
	});

  $scope.group = {
     name: 'name',
     tel: '123-45-67',
     number: 29,
     range: 10,
     url: 'http://example.com',
     search: 'blabla',
     color: '#6a4415',
     date: null,
     time: '12:30',
     datetime: null,
     month: null,
     week: null
   };
  //  console.log( $scope.group.name );
  $scope.membershipSizes = [
          "0-25",
          "25-50",
          "50-100",
          "100-500"
      ];

}]); //end controller
