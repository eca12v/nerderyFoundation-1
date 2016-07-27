myApp.controller( 'GroupController', ['$scope', '$http', '$location', '$rootScope', 'groupFactory', '$routeParams', function( $scope, $http, $location, $rootScope, groupFactory, $routeParams ){

  groupFactory.getGroup($routeParams.groupName).then(function(response) {
		$scope.group = response.data;
    console.log($scope.group);
	});

}]); //end controller
