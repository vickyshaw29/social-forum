import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Card from '../components/Cards';
import { Grid } from '@mui/material';
import Loader from '../components/stuff/Loader';
import {FETCH_POSTS} from '../graphQl/Query/Query'

const HomePage = ({history}) => {
  const { loading,data } = useQuery(FETCH_POSTS);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);
  
  return (
    <Grid container>
      {loading && <Loader/>}
      <Card posts={posts} history={history}/>
    </Grid>
  );
};


export default HomePage;
