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
    saleSource: [SaleInfo]
  }

  type SaleInfo {
    _id: ID
    site: String
    buyLink: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input bookData {
    bookId: String
    authors: [String]
    title: String
    description: String
    categories: [String]
    image: String
    isbn13: String
    isbn10: String
    webReaderLink: String
    goolePlayBooks: String
    googleRatings: Int
    publishedDate: String
    publisher: String
  }

  input saleInfo {
    site: String
    buyLink: String
  }

  type Query {
    users: [User]
    user(username: String): User
    getMe: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    favouriteBook(input: bookData): User
    readBook(input: bookData): User
  }
`

// export the typeDefs
module.exports = typeDefs;