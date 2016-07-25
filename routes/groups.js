var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/createGroup', function (req, res) {
console.log('inside groups.js add group ');
  console.log(req.body);

  var newGroup = new group({
    groupName: req.body.groupName,
    groupURL: req.body.groupURL,
    groupContact: req.body.groupContact
  });

console.log( 'newGroup: ', newGroup );
  newGroup.save(function(err) {

    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(newGroup);
    }
  });
});//end of post createGroup

router.delete('/deleteGroup/:groupId', function(req, res){
  console.log('In /deleteGroup/:groupId: ', req.params.groupId);
  var id = req.params.groupId;
  group.findOne({'_id': id}, function(err, groupon){
    if(err){
      console.log('/deleteGroup error: ', err);
    }else{
      group.remove({'_id': id}, function(err){
        if(err){
          console.log('remove group error: ', err);
        }else{
        }
      });
    }
  });
});

module.exports = router;
