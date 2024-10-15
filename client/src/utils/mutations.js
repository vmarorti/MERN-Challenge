import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//   * `SAVE_BOOK` will execute the `saveBook` mutation.
export const SAVE_BOOK = gql`
mutation saveBook($bookInput: BookData) {
  saveBook(bookInput: $bookInput) {
    _id
    username
    email
    savedBooks {
      description
      bookId
      image
      link
      title
      authors
    }
  }
}
`;

//   * `REMOVE_BOOK` will execute the `removeBook` mutation.
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      description
      bookId
      image
      link
      title
      authors
    }
    bookCount
  }
}
`