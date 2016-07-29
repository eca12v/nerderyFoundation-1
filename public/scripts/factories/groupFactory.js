myApp.factory( 'groupFactory', ['$http',
  function($http) {
    console.log( 'groupfactory loaded');
    var groups = {
      groups: []
    };

    groups.getApprovedGroups = function () {
      return $http.get('groups/getApprovedGroups').success(function(data) {
        console.log('in getApprovedGroups in factory, data: ', data);
				angular.copy(data, groups.groups);
			});
     };

    groups.getUnapprovedGroups = function () {
      return $http.get('groups/getUnapprovedGroups').success(function(data) {
        console.log('in getUnapprovedGroups in factory, data: ', data);
				angular.copy(data, groups.groups);
			});
     };

     groups.approveGroup = function(id) {
       return $http.put('groups/approveGroup/' + id).success(function(data) {
         console.log('in approveGroup in factory, data: ', data);
     });
   };

   groups.getGroup = function(groupName) {
     return $http.get('groups/getGroup/' + groupName).success(function(data) {
       console.log('in getGroup in factory, data: ', data, groups);
       angular.copy(data, groups.groups);
     });
   };

    groups.submit = function ( newGroup ) {
      console.log( 'in factory, newGroup: ', newGroup);
      return $http.post('/groups/createGroup', newGroup);
     };
     console.log('in submitGroup in factory, groups: ', groups);
     return groups;
   }

]); //end of Group Factory
