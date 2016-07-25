var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var providers = {
  'googleAuth' : {
    'clientID': '125382478230-3n8qqoeugab70kluqqm1o3hleh6acbcc.apps.googleusercontent.com',
    'clientSecret': 'HNU0Ebbps7g5D1Q1bu1ErECb',
    'callbackURL': 'http://localhost:8080/auth/google/callback'
  }
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
      clientID: providers.googleAuth.clientID,
      clientSecret: providers.googleAuth.clientSecret,
      callbackURL: providers.googleAuth.callbackURL,
  },
  function(token, refreshToken, profile, done) {
    console.log(profile);
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {
      // try to find the user based on their google id
      User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          // if a user is found, log them in
          return done(null, user);
        } else {
          // if the user isnt in our database, create a new user
          var newUser = new User();
          // set all of the relevant information
          newUser.username = profile.displayName;
          newUser.email = profile.emails[0].value;
          // pull the first email
          // save the user
          newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
          });
        }
      });
    });
  })
);
