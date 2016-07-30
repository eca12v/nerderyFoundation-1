var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.put('/editGroup/:id', function(req, res) {
  console.log('inside router edit, id: ', req.params.id );
  Group.findOne({'_id': req.params.id}, function(err, group) {
    console.log( 'after Groups.findOne, group: ', group );
    if(err) {
      console.log('/editGroup error: ', err);
    } else {
      console.log('req.body:', req.body);
      // group.update({'_id': req.body.id}, function(err){
      //   if(err){
      //     console.log(err);
      //   }else{
      group.name = req.body.name;
      group.contactEmail = req.body.contactEmail;
      group.groupContact = req.body.contact;
      group.description = req.body.description;
      group.location = req.body.location;
      group.activities = req.body.activities;
      group.technologies = req.body.technologies;
      group.tags = req.body.tags;
      group.freqOfMeeting = req.body.freqOfMeeting;
      group.sizeOfMeeting = req.body.sizeOfMeeting;
      group.sizeOfMembership = req.body.sizeOfMembership;
      group.affiliations = req.body.affiliations;
      group.affiliationURL = req.body.affiliationURL;
      
      group.save(function(err) {
        console.log( 'after group saved in groups.js');
        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(group);
          res.json(group);
        }
      });
    // }
  // }
  // );
  }
});
});//end of edit
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
  Group.findOne({'name': req.params.groupName}, function(err, group) {
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
    name: req.body.name,
    groupURL: req.body.groupURL,
    groupContact: req.body.contact,
    contactEmail: req.body.contactEmail,
    description: req.body.description,
    location: req.body.location,
    activities: req.body.activities,
    technologies: req.body.technologies,
    tags: req.body.tags,
    freqOfMeeting: req.body.freqOfMeeting,
    sizeOfMeeting: req.body.sizeOfMeeting,
    affiliations: req.body.affiliations,
    affiliationURL: req.body.affiliationURL,
    eventInfo: req.body.eventInfo,
    sizeOfMembership: req.body.sizeOfMembership

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
