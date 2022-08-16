import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, useReactiveVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import BarBooks from './pages/BarBooks';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import CreateDrink from './pages/CreateDrink';
import SearchDrinks from './pages/Search';
import SingleDrink from './pages/SingleDrink'

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
  // attach 'Bearer <token>' for every request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <div className='my-3 py-4'></div>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route path="/search">
                <Route path=":searchInput" element={<SearchDrinks />}/>
                <Route path="" element={<SearchDrinks />}/>
              </Route>
              <Route
                path="/create-drink"
                element={<CreateDrink />}
              />
              <Route
                path="/barbooks"
                element={<BarBooks />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/drink/:id"
                element={<SingleDrink />}
              />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>

            </Routes>
          <div className='my-5 py-5'></div>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;