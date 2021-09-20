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
