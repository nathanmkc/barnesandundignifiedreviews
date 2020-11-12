const mongoose = require('mongoose');
const db = require('./index.js');

const bookSchema = new mongoose.Schema({
  title: String,
  ISBN: Number,
  reviews: [{
    author: String,
    location: String,
    authorReviews: Number,
    votes: Number,
    readerType: String,
    rating: Number,
    createdAt: Date,
    title: String,
    body: String,
    spoilers: Boolean,
    tags: [{
      tagName: String
    }],
    recommended: Boolean,
    helpfulYes: Number,
    helpfulNo: Number
  }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;