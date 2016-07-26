myApp.factory( 'groupFactory', ['$http',
  function($http) {
    console.log( 'groupfactory loaded');
    var groups = {
      groups: []
    };

    groups.getApprovedGroups = function () {
      return $http.get('groups/getApprovedGroups').success(function(data) {
        console.log(data);
				angular.copy(data, groups.groups);
			});
     };

    groups.getUnapprovedGroups = function () {
      return $http.get('groups/getUnapprovedGroups').success(function(data) {
        console.log(data);
				angular.copy(data, groups.groups);
			});
     };

     groups.approveGroup = function(id) {
       return $http.put('groups/approveGroup/' + id).success(function(data) {
         console.log(data);
     });
   };

    groups.submit = function ( newGroup ) {
      console.log( 'in factory, newGroup: ', newGroup);
      return $http.post('/groups/createGroup', newGroup);
     };
     console.log(groups);
     return groups;
   }
]); //end of Group Factory
