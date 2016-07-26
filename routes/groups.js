var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getApprovedGroups', function(req, res) {
  Group.find({'approved': true}).sort({created: 'desc'}).exec(function(err, groups) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(groups);
    }
  });
});

router.get('/getUnapprovedGroups', function(req, res) {
  Group.find({'approved': false}).sort({created: 'desc'}).exec(function(err, groups) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(groups);
    }
  });
});

router.get('/getGroup/:groupName', function(req, res) {
  Group.findOne({'groupName': req.params.groupName}, function(err, group) {
    if(err) {
      console.log('/getGroup error: ', err);
      res.sendStatus(500);
    } else {
      res.json(group);
    }
  });
});

router.put('/approveGroup/:id', function(req, res) {
  Group.findOne({'_id': req.params.id}, function(err, group) {
    if(err) {
      console.log('/approveGroup error: ', err);
    } else {
      group.approved = true;
      group.save(function(err) {
        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.json(group);
        }
      });
    }
  });
});

router.post('/createGroup', function (req, res) {
console.log('inside groups.js add group ');
  console.log(req.body);

  var newGroup = new Group({
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
  Group.findOne({'_id': id}, function(err, groupon){
    if(err){
      console.log('/deleteGroup error: ', err);
    }else{
      Group.remove({'_id': id}, function(err){
        if(err){
          console.log('remove group error: ', err);
        }else{
        }
      });
    }
  });
});

module.exports = router;
