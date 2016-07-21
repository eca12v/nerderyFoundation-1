var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/createGroup', function (req, res) {
  console.log(req.body);

  var newGroup = new group({
    groupName: req.body.groupName,
    groupURL: req.body.groupURL,
    groupContact: req.body.contactName
  });

  newGroup.save(function(err) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(newSound);
    }
  });
});//end of post createGroup

module.exports = router;
