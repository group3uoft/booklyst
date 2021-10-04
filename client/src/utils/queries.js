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

export const QUERY_CHECKOUT = gql`
  query getCheckout($donate: Float!) {
    checkout(donate: $donate) {
      session
    }
  }
`;

export const QUERY_PRICE_LIST = gql`
  query getPriceList($isbn: String!) {
  getPriceList(isbn: $isbn) {
    amazon {
      bookName
      bookPrice
      priceEbook
    }
    indigo {
      bookName
      bookPrice
      priceEbook
    }
  }
} 
`;