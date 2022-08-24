import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../src/components/Nav'
import Login from './pages/Login';
import Home from './pages/Home';
import Pictures from './pages/Pictures';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let httpLink;
if (process.env.NODE_ENV === 'development') {
  httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });  
} else {
  httpLink = createHttpLink({
    uri: '/graphql',
  });
}


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
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/pictures' element={<Pictures />}></Route>

        </Routes>
      </section>
    </ApolloProvider>
  )
};

export default App;