var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var jswt = require('jsonwebtoken');
var sanitizer = require('sanitizer');
var request = require('request');
var authConfig = require('../modules/authConfig');
// bring in user schema
var User = require('../models/Users');
// auth check
var auth = jwt({secret: authConfig.TOKEN_SECRET, userProperty: 'payload'});
// create a new admin user
router.post('/signup', auth, function(req, res, next){
  var user = new User({
    "username": req.body.username,
    "email": req.body.email
  });
  user.setPassword(req.body.password);
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()});
  });
});
// admin login
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
// google oauth
router.post('/google', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: authConfig.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };
  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };
    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ google: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jswt.verify(token, authConfig.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.google = profile.sub;
            user.username = profile.given_name || profile.name;
            user.email = profile.email;
            user.save(function() {
              var token = user.generateJWT();
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ google: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: existingUser.generateJWT() });
          }
          var user = new User();
          user.google = profile.sub;
          user.username = profile.given_name || profile.name;
          user.email = profile.email;

          user.save(function(err) {
            var token = user.generateJWT();
            res.send({ token: token });
          });
        });
      }
    });
  });
});
// facebook oauth
router.post('/facebook', function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: authConfig.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }
    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.header('Authorization')) {
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jswt.verify(token, authConfig.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.facebook = profile.id;
            user.username = profile.first_name || profile.name;
            user.email = profile.email;
            user.save(function() {
              var token = user.generateJWT();
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3. Create a new user account or return an existing one.
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = existingUser.generateJWT();
            return res.send({ token: token });
          }
          var user = new User();
          user.facebook = profile.id;
          user.username = profile.first_name || profile.name;
          user.email = profile.email;
          user.save(function() {
            var token = user.generateJWT();
            res.send({ token: token });
          });
        });
      }
    });
  });
});

module.exports = router;
