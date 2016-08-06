myApp.factory( 'groupFactory', ['$http', function($http) {
  var groups = {
    groups: []
  };

  groups.editGroup = function ( id, updatedGroup ) {
    console.log( 'inside editGroup Factory, groupURL ', updatedGroup.groupURL );
    console.log( 'inside editGroup Factory, updatedGroup ', updatedGroup);
    return $http.put('groups/editGroup/' + id, updatedGroup ).success(function(data) {
    console.log('returning editGroup ', data.groupURL);
    });
  };

  groups.deleteGroup = function ( groupToDelete ) {
    console.log( 'groupToDelete: ', groupToDelete);
    return $http.delete('groups/deleteGroup/' + groupToDelete ).success(function(){
    });
};
  groups.getApprovedGroups = function () {
    return $http.get('groups/getApprovedGroups').success(function(data) {
			angular.copy(data, groups.groups);
		});
   };

  groups.getUnapprovedGroups = function () {
    return $http.get('groups/getUnapprovedGroups').success(function(data) {
			angular.copy(data, groups.groups);
		});
   };

   groups.flagGroup = function(id) {
     return $http.put('groups/flagGroup/' + id).success(function(data) {
       console.log(data);
 		});
  };

  groups.unFlagGroup = function(id) {
    return $http.put('groups/unFlagGroup/' + id).success(function(data) {
      console.log(data);
   });
 };

   groups.getFlaggedGroups = function() {
     return $http.get('groups/getFlaggedGroups').success(function(data) {
 			angular.copy(data, groups.groups);
 		});
  };

   groups.approveGroup = function(id) {
     return $http.put('groups/approveGroup/' + id).success(function(data) {
       console.log(data);
     });
   };
   groups.getGroup = function(groupName) {
     console.log(groupName);
     return $http.get('groups/getGroup/' + groupName).success(function(data) {
       console.log('in getGroup in factory, data: ', data, groups);
       angular.copy(data, groups.groups);
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
