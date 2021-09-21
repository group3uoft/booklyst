import { gql } from '@apollo/client';

// query me
export const QUERY_ME = gql`
query Query {
  getMe {
    _id
    username
    email
    favourites {
      _id
      authors
      description
      bookId
      image
      link
      title
      pageCount
      categories
      language
      saleSource {
        site
      }
    }
    read {
      _id
      authors
      description
      bookId
      image
      link
      title
      pageCount
      categories
      language
      saleSource {
        site
      }
    }
  }
}
`

export const QUERY_CHECKOUT = gql`
  query getCheckout($amount: Float!) {
    checkout(donate: $amount) {
      session
    }
  }
`;