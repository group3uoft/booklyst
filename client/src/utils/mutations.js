import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
     token
    user {
      _id
      username
      email
    }
  }
}
`;

export const SIGNUP = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`

export const ADD_FAV = gql`
  mutation addFavouriteBook($addBook: bookData!) {
    addFavouriteBook(input: $addBook) {
      _id
      username
      email
      favourites {
        bookId
        authors
        title
        description
        categories
        image
        isbn13
        isbn10
        webReaderLink
        googleListPrice
        googleRetailPrice
        goolePlayBooks
        googleRatings
        publishedDate
        publisher
      }
      
      read {
        bookId
        authors
        title
        description
        categories
        image
        isbn13
        isbn10
        webReaderLink
        googleListPrice
        googleRetailPrice
        goolePlayBooks
        googleRatings
        publishedDate
        publisher
      }

      favouritesCount
      readCount
      searchHistory
    }
  }
`

export const ADD_DONATION = gql`
  mutation addDonation($donationData: donation!) {
    addDonation(input: $donationData) {
      _id
      username
      email
      donations {
        _id
        amount
        createdAt
      }
    }
  }
`