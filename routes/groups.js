var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Group = require('../models/Groups');

var router = express.Router();

// require to upload images
var multer = require('multer');
var fs = require('fs');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();

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
    name: req.body.name,
    groupURL: req.body.groupURL,
    groupContact: req.body.groupContact,
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

// for uploading photos
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nerdery-foundation-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // file name generation
      cb(null, Date.now().toString());
    }
  })
}); // end multer upload

router.post('/uploads', upload.single('file'), function(req, res){
res.send(req.file);
});

module.exports = router;
