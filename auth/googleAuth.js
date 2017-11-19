'use strict'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


let User = require('../models/user');
let creds = require('../credentials.js');


  module.exports = function(passport){

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });



  passport.use('google', new GoogleStrategy({
    clientID     : creds.googleAuth.clientID,
    clientSecret : creds.googleAuth.clientSecret,
    callbackURL  : creds.googleAuth.callbackURL,
    passReqToCallback   : true
  },
  function(req, token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
  
            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    let newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));
  }

