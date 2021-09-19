const { gql } = require('apollo-server-express');

//typeDefs definition
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    favourites: [Book]
    read: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
    pageCount: Int
    categories: [String]
    language: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input bookData {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
    pageCount: Int
    categories: [String]
    language: String
  }

  type Query {
    users: [User]
    user(username: String): User
    getMe: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addFavouriteBook(input: bookData!, iddd: String): User
    deleteFavouriteBook(ibsnId: String!, iddd: String): User
  }
`
//addFavouriteBook(input: bookData!): User
//deleteFavouriteBook(ibsnId: String!): User
// export the typeDefs
module.exports = typeDefs;