var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var providers = {
  'googleAuth' : {
    'clientID': '125382478230-3n8qqoeugab70kluqqm1o3hleh6acbcc.apps.googleusercontent.com',
    'clientSecret': 'HNU0Ebbps7g5D1Q1bu1ErECb',
    'callbackURL': 'http://localhost:8080/auth/google/callback'
  },
  'facebookAuth' : {
        'clientID'      : '621280634704305', // your App ID
        'clientSecret'  : 'a8fa21e754f6ad0f21ab615c4c101d02', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },
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

passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : providers.facebookAuth.clientID,
    clientSecret    : providers.facebookAuth.clientSecret,
    callbackURL     : providers.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'email' : profile.emails[0].value}, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    // newUser.facebook.id    = profile.id; // set the users facebook id
                    // newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.username  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
