const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs');

const bookDataSchema = require('./Book');
const donationHistorySchema = require('./Donation');

//---USER SCHEMA---//
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    //favourite books
    favourites: [bookDataSchema],

    //read books
    read: [bookDataSchema],

    //search history
    searchHistory: [String],

    //donation history
    donations: [donationHistorySchema]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('favouritesCount').get(function() {
  return this.favourites.length;
});

userSchema.virtual('readCount').get(function() {
  return this.read.length;
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//favourite book count

const User = model('User', userSchema);

module.exports = User;