import { gql } from '@apollo/client';

// query me
export const QUERY_ME = gql`
query Query {
  getMe {
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