const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signInToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const {getPrice} = require('../utils/webScraper');

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
    },

    checkout: async (parent, {donate}, context) => {

      const amount = parseFloat(donate * 100).toFixed(0);
      const url = new URL(context.headers.referer).origin;
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: `Donation - $${donate}`,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      
      return { session: session.id };
    },

    getPriceList: async (parent, { isbn }) => {
      const priceList = await getPrice(isbn).then(response => {
        return response;
      })
      return priceList;
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

    addFavouriteBook: async (parent, { input }, context) => {
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favourites: input}},
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    deleteFavouriteBook: async (parent, {bookId}, context) => {
      if(context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { favourites: {bookId: bookId}}},
        { new: true }
      );

      return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addReadBook: async (parent, { input }, context) => {
      if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { read: input}},
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteReadBook: async (parent, {bookId}, context) => {
      if(context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { read: {bookId: bookId}}},
        { new: true }
      );

      return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    searchedHistory: async (parent, {searchHistory}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { searchHistory: searchHistory }},
        { new: true }
      );
      if (updatedUser.searchHistory.length > 20) {
        updatedUser.searchHistory = updatedUser.searchHistory.splice((updatedUser.searchHistory.length - 20), updatedUser.searchHistory.length)
      }
      return updatedUser;
    },

    addDonation: async (parent, {input }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { donations: {...input}}},
        { new: true }
      );

      return updatedUser;
    }

  }
}

module.exports = resolvers;