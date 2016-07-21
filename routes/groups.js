var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/createGroup', function (req, res) {
  var groupToAdd = {
    groupName: req.body.groupName,
    groupURL: req.body.groupURL,
    contactName: req.body.contactName
  };
  var newGroup = groups(groupToAdd);
  newGroup.save();
});//end of post createGroup

module.exports = router;
