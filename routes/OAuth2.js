'use strict'

const google = require('googleapis');


// Get required credentials
let creds = require('../credentials.js');

// Create OAuth2Client.
const OAuth2 = google.auth.OAuth2;
global.oauth2Client = new OAuth2(creds.googleAuth.clientID, creds.googleAuth.clientSecret, 'http://localhost:3000/oauthcallback');

// Define scope for OAuth2Client
google.options({ auth: oauth2Client });

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/books'
 
});

module.exports = function(router){

    router.get('/consent', function (req, res) { 
    
        res.redirect(url) 
    });
    

    router.get('/oauthcallback', function (req, res) {
      res.setHeader('Content-Type', 'application/json');

      let code = req.query.code;
      let error = req.query.error;

      if(error === 'access_denied'){
        
        res.json({
          'errorCode' : 403,
          'error' : 'accessDenied',
          'errorMessage': 'This application needs your permission to access your google account to perform its basic functions.'
        });

      }
      else 
      {
        oauth2Client.getToken(code, function(err, tokens) {
          if(!err) {
            oauth2Client.setCredentials(tokens);
            console.log(tokens);
            res.redirect('/searches');
          } else {
            res.send(err);
            console.log(err);
          }
  
        });

      }

    });
}