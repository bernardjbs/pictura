import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../src/components/Nav_01'
import Login from './pages/Login';
import Home from './pages/Home';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <section className='app-container'>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Home />}></Route>
          
        </Routes>
      </section>
    </ApolloProvider>
  )
};

export default App;