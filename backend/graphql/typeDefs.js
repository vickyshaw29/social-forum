const { gql } = require('apollo-server');
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    title:String!
    createdAt: String!
    username: String!
    comments:[Comment]!
    likes:[Like]!
    likeCount:Int!
    commentCount:Int!
  }
  type Comment{
    id:ID!,
    createdAt:String!
    username:String
    body:String
  }
  type Like{
    id:ID!
    createdAt:String
    username:String
  }
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId:ID!):Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String):User!
    createPost(title:String!,body:String!,):Post!
    deletePost(postId:String!):String!
    createComment(postId:String!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
  }
  type Subscription{
    newPost:Post!
  }
`;
