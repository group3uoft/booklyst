const { Schema } = require('mongoose');

const saleInfoSchema = require('./SaleInfo');
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookDataSchema = new Schema({
  //"volumeInfo" - authors
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number
  },
  categories: [
    {
      type: String
    }
  ],
  language: {
    type: String
  }
});

module.exports = bookDataSchema;