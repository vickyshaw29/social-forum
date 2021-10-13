import { gql } from 'graphql-tag';

// signup
export const CREATE_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      username
      email
    }
  }
`;
// login
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      username
      createdAt
      body
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;
