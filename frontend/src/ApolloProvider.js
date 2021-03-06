import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@mui/material/styles';
import {setContext} from 'apollo-link-context'
import theme from './Theme';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const authLink=setContext(()=>{
  const token=localStorage.getItem('jwtToken');
  return{
    headers:{
      Authorization:token? `Bearer ${token}`:''
    }
  }
})

const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
