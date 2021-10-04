const { gql } = require('apollo-server-express');

//typeDefs definition
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    favourites: [Book]
    read: [Book]
    favouritesCount: Int
    readCount: Int
    searchHistory: [String]
    donations: [Donation]
  }

  type Book {
    bookId: String
    authors: [String]
    title: String!
    description: String
    categories: [String]
    image: String
    isbn13: String
    isbn10: String
    webReaderLink: String
    googleListPrice: String
    googleRetailPrice: String
    googlePlayBooks: String
    googleRatings: Float
    publishedDate: String
    publisher: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input bookData {
    bookId: String
    authors: [String]
    title: String!
    description: String
    categories: [String]
    image: String
    isbn13: String
    isbn10: String
    webReaderLink: String
    googleListPrice: String
    googleRetailPrice: String
    googlePlayBooks: String
    googleRatings: Float
    publishedDate: String
    publisher: String
  }

  type Checkout {
    session: ID
  }

  type Donation {
    _id: ID
    amount: String
    session: String
    createdAt: String
  }

  input donation {
    amount: String
    session: String
  }

  type PriceList {
    amazon: PriceData
    indigo: PriceData
  }

  type PriceData {
    bookName: String
    bookPrice: String
    priceEbook: String
  }

  type Query {
    users: [User]
    user(username: String): User
    getMe: User
    checkout(donate: Float!): Checkout
    getPriceList(isbn: String!): PriceList
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addDonation(input: donation!): User
    addFavouriteBook(input: bookData): User
    deleteFavouriteBook(bookId: String!): User
    addReadBook(input: bookData): User
    deleteReadBook(bookId: String!): User
    searchedHistory(searchHistory: String!): User
  }
`
//addFavouriteBook(input: bookData!): User
//deleteFavouriteBook(ibsnId: String!): User
//addFavouriteBook(input: bookData!, iddd: String): User
//deleteFavouriteBook(ibsnId: String!, iddd: String): User
// export the typeDefs
module.exports = typeDefs;