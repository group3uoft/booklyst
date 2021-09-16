const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
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

const Order = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
