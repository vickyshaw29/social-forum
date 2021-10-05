import { gql } from 'graphql-tag';

export const CREATE_COMMENT = gql`
   mutation createPost($body:String!){
       createPost(body:$body){
           username
           body
           createdAt
       }
   }
`;

