myApp.factory( 'groupFactory', ['$http', function($http) {
  var groups = {
    groups: []
  };

  groups.editGroup = function ( id, updatedGroup ) {
    console.log( 'inside editGroup Factory, id ', updatedGroup.name );
    console.log( 'inside editGroup Factory, updatedGroup ', updatedGroup);
    return $http.put('groups/editGroup/' + id, updatedGroup ).success(function(data) {

<<<<<<< HEAD
=======
groups.editGroup = function ( id, updatedGroup ) {
  console.log( 'inside editGroup Factory, id ', updatedGroup.name );
  console.log( 'inside editGroup Factory, updatedGroup ', updatedGroup);
  return $http.put('groups/editGroup/' + id, updatedGroup ).success(function(data) {
>>>>>>> origin/anna
    console.log('editGroup ', data);
    });
  };

<<<<<<< HEAD
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

   groups.approveGroup = function(id) {
     return $http.put('groups/approveGroup/' + id).success(function(data) {
       console.log(data);
=======
groups.deleteGroup = function ( groupToDelete ) {
  console.log( 'inside deleteGroup Factory, id ', groupToDelete );
  return $http.delete('groups/deleteGroup/' + groupToDelete ).success(function(data) {
    console.log('deleteGroup ', data);
  });
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
>>>>>>> origin/anna
     });
  };

   groups.getGroup = function(groupName) {
     console.log(groupName);
     return $http.get('groups/getGroup/' + groupName).success(function(data) {
       console.log('in getGroup in factory, data: ', data, groups);
       angular.copy(data, groups.groups);
     });
   };

<<<<<<< HEAD
  groups.submit = function ( newGroup ) {
    console.log( 'in factory, newGroup: ', newGroup);
    return $http.post('/groups/createGroup', newGroup);
   };
   console.log(groups);
   return groups;
 }
=======
    groups.submit = function ( newGroup ) {
      console.log( 'in factory, newGroup: ', newGroup);
      return $http.post('/groups/createGroup', newGroup);
     };
     console.log('in submitGroup in factory, groups: ', groups);
     return groups;
   }

>>>>>>> origin/anna
]); //end of Group Factory
