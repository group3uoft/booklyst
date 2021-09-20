const { Schema } = require('mongoose');

const saleInfoSchema = new Schema({
  site: {
    type: String
  },
  buyLink: {
    type: String
  }
})

module.exports = saleInfoSchema;