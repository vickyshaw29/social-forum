import { gql } from 'graphql-tag';

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
      title
    }
  }
`;
