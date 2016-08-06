var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Group = require('../models/Groups');
var passport = require('passport');
var jwt = require('express-jwt');
var authConfig = require('../modules/authConfig');
// authentication check
var auth = jwt({secret: authConfig.TOKEN_SECRET, userProperty: 'payload'});
// require to upload images
var multer = require('multer');
var fs = require('fs');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var router = express.Router();
// router middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// get all approved groups
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
// all unapproved groups
router.get('/getUnapprovedGroups', auth, function(req, res) {
  Group.find({'approved': false}).sort({created: 'desc'}).exec(function(err, groups) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(groups);
    }
  });
});
// approve a group
router.put('/approveGroup/:id', auth, function(req, res) {
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
// flag a group
router.put('/flagGroup/:id', function(req, res) {
  Group.findOne({'_id': req.params.id}, function(err, group) {
    if(err) {
      console.log('/flagGroup error: ', err);
    } else {
      group.flags++;
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
// unflag a group
router.put('/unFlagGroup/:id', function(req, res) {
  Group.findOne({'_id': req.params.id}, function(err, group) {
    if(err) {
      console.log('/flagGroup error: ', err);
    } else {
      group.flags = 0;
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
// get all groups with more than 0 flags
router.get('/getFlaggedGroups', function(req, res) {
  Group.find({'flags': { $gt: 0 }}).sort({ flags: 'desc'}).exec(function(err, groups) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(groups);
    }
  });
});
// retrieve a group by its name
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
// for uploading photos
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nerdery-foundation-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    // key: function (req, file, cb) {
    //   // file name generation
    //   cb(null, Date.now().toString());
    // }
  })
}); // end multer upload
// create a new group
router.post('/createGroup', upload.single('file'), function (req, res) {
  var newGroup = new Group({
    name: req.body.name,
    groupURL: req.body.groupURL,
    groupContact: req.body.contact,
    contactEmail: req.body.contactEmail,
    description: req.body.description,
    location: req.body.location,
    activities: req.body.activities,
    technologies: req.body.technologies,
    coreTechnologies: req.body.coreTechnologies,
    tags: req.body.tags,
    freqOfMeeting: req.body.freqOfMeeting,
    sizeOfMeeting: req.body.sizeOfMeeting,
    affiliations: req.body.affiliations,
    affiliationURL: req.body.affiliationURL,
    eventInfo: req.body.eventInfo,
    sizeOfMembership: req.body.sizeOfMembership,
    submitterID: req.body.submitterID
  });
  if (req.file ){
    newGroup.photoURL = req.file.location;
  } else {
    newGroup.photoURL = '../images/startup-photos-medium.jpg';
  }
  
  newGroup.save(function(err) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(newGroup);
    }
  });
});
// edit group endpoint
router.put('/editGroup/:id', auth, function(req, res) {
  Group.findOne({'_id': req.params.id}, function(err, group) {
    if(err) {
      console.log('/editGroup error: ', err);
    } else {
      group.name = req.body.name;
      group.groupURL = req.body.groupURL;
      group.contactEmail = req.body.contactEmail;
      group.groupContact = req.body.contact;
      group.description = req.body.description;
      group.location = req.body.location;
      group.activities = req.body.activities;
      group.technologies = req.body.technologies;
      group.coreTechnologies = req.body.coreTechnologies;
      group.tags = req.body.tags;
      group.freqOfMeeting = req.body.freqOfMeeting;
      group.sizeOfMeeting = req.body.sizeOfMeeting;
      group.sizeOfMembership = req.body.sizeOfMembership;
      group.affiliations = req.body.affiliations;
      group.affiliationURL = req.body.affiliationURL;

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
// delete a group
router.delete('/deleteGroup/:groupId', function(req, res){
  var id = req.params.groupId;
  Group.findOne({'_id': id}, function(err, group){
    if(err){
      console.log('/deleteGroup error: ', err);
    } else {
      Group.remove({'_id': id}, function(err){
        if(err){
          console.log('remove group error: ', err);
        } else {
          res.json({});
        }
      });
    }
  });
});

module.exports = router;
