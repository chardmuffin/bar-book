import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
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

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/search"
                element={<SearchDrinks />}
              />
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
          </div>
          <div className='my-5 py-5'></div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;