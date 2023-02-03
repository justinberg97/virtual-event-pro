import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Profile from './pages/Profile';
import CreateEvents from './pages/CreateEvents';
import SearchEvents from './pages/SearchEvents';
import SavedEvents from './pages/SavedEvents';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';

const httpLink = createHttpLink({
  uri: '/graphql',
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
      <Router>
        <>
          <Navbar />
          <Routes>
          <Route 
              path="/" 
              element={<HomePage/>} 
            />
          <Route 
              path="/createevents" 
              element={<CreateEvents/>} 
            />
            <Route 
              path="/profile" 
              element={<Profile/>} 
            />
            <Route 
              path="/search" 
              element={<SearchEvents/>} 
            />
            <Route 
              path="/saved" 
              element={<SavedEvents/>} 
            />
            <Route 
              path='*' 
              element={<h1 className="display-2">Wrong page</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
