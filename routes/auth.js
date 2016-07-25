var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var sanitizer = require('sanitizer');

var User = require('../models/Users');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/signup', function(req, res, next){
  console.log(req.body);
  console.log('signup hit');
  // some basic input validation
  // if(!req.body.username || !req.body.email || !req.body.password || !req.body.passwordRepeat){
  //   return res.status(400).json({message: 'Please fill out all fields'});
  // }
  // make sure repeat password is the same
  // if (req.body.password != req.body.passwordRepeat) {
  //   return res.status(400).json({message: 'Your passwords did not match'});
  // }
  // the user object
  var user = new User({
    "username": req.body.username,
    "email": req.body.email
  });
  user.setPassword(req.body.password);
  user.save(function (err){
    if(err){ return next(err); }
    // send off a json web token to be stored client side
    return res.json({token: user.generateJWT()});
  });
});
// login
router.post('/login', function(req, res, next){
  console.log(req.body);
  console.log('login hit');
  // basic input validation
  // if(!req.body.username || !req.body.password){
  //   return res.status(400).json({message: 'Please fill out all fields'});
  // }
  // use passports local strategy to authenticate inputed credentials
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    console.log('passport ' + user);
    // if everything checks out send out a jwt
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
