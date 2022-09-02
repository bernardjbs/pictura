import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Store from './utils/GlobalState';
import Nav from '../src/components/Nav'
import Login from './pages/Login';
import Home from './pages/Home';
import Pictures from './pages/Pictures';
import Success from './pages/Success';
import Signup from './pages/Signup';

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
      <Store>
        <Nav />
        <section className='app-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/pictures' element={<Pictures />} />
            <Route path='/success' element={<Success />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </section>
      </Store>
    </ApolloProvider>
  )
};

export default App;