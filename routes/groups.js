app.post('/createGroup', function (req, res) {
  var groupToAdd = {
    groupName: req.body.groupName,
    groupURL: req.body.groupURL,
    contactName: req.body.contactName
  };
  var newGroup = groups(groupToAdd);
  newGroup.save();
});//end of post createGroup
