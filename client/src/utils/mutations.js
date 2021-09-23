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
    mutation addFavouriteBook($input: bookData) {
    addFavouriteBook(input: $input) {
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
        googlePlayBooks
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
        googlePlayBooks
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

export const ADD_READ = gql`
    mutation addReadBook($input: bookData) {
      addReadBook(input: $input) {
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
        googlePlayBooks
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
        googlePlayBooks
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
export const DELETE_FAV = gql`
  mutation deleteFavouriteBook($bookId: String!) {
  deleteFavouriteBook(bookId: $bookId) {
     _id
    username
    email
    favourites {
      bookId
    }
    
    read {
      bookId
    }

    favouritesCount
    readCount
    searchHistory
  }
  }
`

export const DELETE_SAVED = gql`
  mutation deleteReadBook($bookId: String!) {
    deleteReadBook(bookId: $bookId) {
     _id
    username
    email
    favourites {
      bookId
    }
    
    read {
      bookId
    }

    favouritesCount
    readCount
    searchHistory
  	}
  }
`

export const ADD_SEARCH_HISTORY = gql`
  mutation searchedHistory($searchHistory: String!) {
    searchedHistory(searchHistory: $searchHistory) {
     _id
    username
    email
    searchHistory
  	}
  }
`

