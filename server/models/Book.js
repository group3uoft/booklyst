const { Schema } = require('mongoose');

const saleInfoSchema = require('./SaleInfo');
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookDataSchema = new Schema({
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  //"volumeInfo" - authors
  authors: [
    {
      type: String,
    },
  ],

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String
  },

  categories: [
    {
      type: String
    }
  ],

  image: {
    type: String,
  },

  isbn13: {
    type: String,
  },

  isbn10: {
    type: String,
  },

  webReaderLink: {
    type: String,
  },
  
  googleListPrice: {
    type: String
  },

  googleRetailPrice: {
    type: String
  },

  googlePlayBooks: {
    type: String
  },

  googleRatings: {
    type: String
  },

  publishedDate: {
    type: String
  },

  publisher: {
    type: String
  },
});

module.exports = bookDataSchema;