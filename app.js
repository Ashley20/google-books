const express    = require('express'),
      bodyParser = require('body-parser'),
      path       = require('path'),
      mongoose   = require('mongoose'),
      passport   = require('passport'),
      session    = require('express-session'),
      mongodb    = require('mongodb'),
      MongoClient = mongodb.MongoClient;
      router     = express.Router();
      app        = express();
     

const creds = require('./credentials.js');

// Configure the app
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(router);


// connect to mLab
/*
mongoose.connect(creds.url1, (err, database) => {
	if(err){
		console.log(err);
  }
  else{
    console.log("connected to mLab");
  }

});
*/
let settings = {
  reconnectTries : Number.MAX_VALUE,
  autoReconnect : true
}

mongoose.connect(creds.url1,   (err, dbref) => {
  if(err){
    throw err;
  } else {
    console.log('Successfully connected to mLab');
  }
});

require('./auth/googleAuth')(passport);
require('./routes/OAuth2')(router);
require('./routes/auth')(router, passport);
require('./routes/books')(router);




app.listen(3000, () => {
    console.log('app started on port 3000');
});
      