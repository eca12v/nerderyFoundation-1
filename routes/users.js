var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('../models/Users');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signUp', function (req, res) {

});//end of signUp function

router.post('/logIn', function (req, res) {

});//end of Log In function


module.exports = router;
