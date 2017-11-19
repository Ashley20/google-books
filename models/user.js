'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  id       : Schema.Types.ObjectId,
  name          : String,
  password      : String,
  
  google     : {
    id    : String,
    name  : String,
    email : String,
    token : String
  }


});

var User = mongoose.model('User', userSchema);

// make this available
module.exports = User;