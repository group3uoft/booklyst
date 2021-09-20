const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signInToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },

    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.findOne({params})
    },

    getMe: async(parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
    
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signInToken(user);
      return {user, token};
    },

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signInToken(user);
      return { token, user };
    },

    addFavouriteBook: async (parent, {input }, context) => {
      console.log(input)
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { favourites: {...input}}},
        { new: true }
      );

      return updatedUser;
    },

    deleteFavouriteBook: async (parent, {ibsnId}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { favourites: {bookId: ibsnId}}},
        { new: true }
      );

      return updatedUser;
    },

    addReadBook: async (parent, {input }, context) => {
      console.log(input)
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { read: {...input}}},
        { new: true }
      );

      return updatedUser;
    },

    deleteReadBook: async (parent, {ibsnId}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { read: {bookId: ibsnId}}},
        { new: true }
      );

      return updatedUser;
    },

    searchedHistory: async (parent, {searchString}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { searchHistory: searchString }},
        { new: true }
      );

      return updatedUser;
    }
  }
}

/*addReadBook: async (parent, {input, iddd}, /*context//) => {
  console.log(input)
  const updatedUser = await User.findOneAndUpdate(
    { _id: iddd/*context.user._id// },
    { $push: { read: {...input}}},
    { new: true }
  );

  return updatedUser;
},*/

module.exports = resolvers;