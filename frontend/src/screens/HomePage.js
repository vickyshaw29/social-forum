import React, { useEffect, useState } from 'react';
import { gql } from 'graphql-tag';
import { useQuery,useMutation } from '@apollo/react-hooks';
import {CREATE_COMMENT} from '../mutation/Mutations'
const HomePage = () => {
  const { loading, data } = useQuery(FETCH_POSTS);
  const [post, setPost] = useState('')
  const [createPost ,{loading:loadData,error}]=useMutation(CREATE_COMMENT)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);
  const onClick=()=>{
    createPost({
      variables:{
        body:posts
      }
    })
  }
  return (
    <div>
      Hello World !
    </div>
  );
};

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
    }
  }
`;
export default HomePage;
