const { Schema } = require('mongoose');

const donationHistorySchema = new Schema({
  // saved book id from GoogleBooks
  amount: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = donationHistorySchema;