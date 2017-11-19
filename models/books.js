'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
var bookSchema = new Schema({
  mongoID       : Schema.Types.ObjectId,
  kind          : String,
  id            : String,
  selfLink      : String,

  volumeInfo : {
    title         : String,
    subtitle      : String,
    authors       : [String],
    publisher     : String,
    publishedDate : String,
    description   : String,
    pageCount     : Number,
    categories    : [String],
    previewLink   : String,
    infoLink      : String,


    readingModes : {
      text   : Boolean,
      image  : Boolean
    }
    
  }

});

var Book = mongoose.model('Book', bookSchema);

// make this available
module.exports = Book;