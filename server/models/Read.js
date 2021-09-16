const mongoose = require('mongoose');

const { Schema } = mongoose;

const readSchema = new Schema({
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
  ],
  read: {
      type: Boolean,
      require: true
  }
});

const Read = mongoose.model('Read', favoriteSchema);

module.exports = Read;
