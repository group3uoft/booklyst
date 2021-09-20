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

// Save favourite
export const SAVE_FAVOURITE = gql`
  mutation favouriteBook($input: bookData) {
    favouriteBook(input: $input) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        categories
        image
        isbn13
        isbn10
        webReaderLink
        goolePlayBooks
        googleRatings
        publishedDate
        publisher
      }
    }
  }
`;

// save read books
export const SAVE_READ = gql`
  mutation saveBook($input: bookData) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
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
    }
  }
`;
