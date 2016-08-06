nerderyApp.factory( 'groupFactory', ['$http', function($http) {
  var groups = {
    groups: []
  };
  // edit the group
  groups.editGroup = function ( id, updatedGroup ) {
    return $http.put('groups/editGroup/' + id, updatedGroup ).success(function(data) {});
  };
  // delete group
  groups.deleteGroup = function ( groupToDelete ) {
    return $http.delete('groups/deleteGroup/' + groupToDelete ).success(function(){});
  };
  // get all groups with approved = true
  groups.getApprovedGroups = function () {
    return $http.get('groups/getApprovedGroups').success(function(data) {
			angular.copy(data, groups.groups);
		});
  };
  // get all groups with approved = false
  groups.getUnapprovedGroups = function () {
    return $http.get('groups/getUnapprovedGroups').success(function(data) {
      angular.copy(data, groups.groups);
    });
  };
  // flag a group
  groups.flagGroup = function(id) {
    return $http.put('groups/flagGroup/' + id).success(function(data) {});
  };
  // unflag a group
  groups.unFlagGroup = function(id) {
    return $http.put('groups/unFlagGroup/' + id).success(function(data) {});
  };
  // get all groups with flags > 0
  groups.getFlaggedGroups = function() {
    return $http.get('groups/getFlaggedGroups').success(function(data) {
      angular.copy(data, groups.groups);
    });
  };
  // approve a group
  groups.approveGroup = function(id) {
    return $http.put('groups/approveGroup/' + id).success(function(data) {});
  };
  // get individual group by its name
   groups.getGroup = function(groupName) {
     return $http.get('groups/getGroup/' + groupName).success(function(data) {
       angular.copy(data, groups.groups);
     });
   };
   // create a new group
   groups.submit = function ( newGroup ) {
     return $http.post('/groups/createGroup', newGroup);
   };
   // return groups object with dynamic data
   return groups;
  }]); //end of Group Factory
