import React, {useState} from 'react';
import './spinner.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './utils/store';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import BookDetail from './Pages/BookDetail';
import Donate from './Pages/Donate';
import Success from './Pages/Success';
import Browse from './Pages/Browse'

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
  const [searchInput, setSearchInput] = useState('best seller');
  const [title, setTitle] = useState('Best Sellers');
  const [booksToRender, setBooksToRender] = useState([]);

  return (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home searchInput={searchInput} setSearchInput={setSearchInput} setTitle={setTitle} title={title} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard booksToRender={booksToRender} setBooksToRender={setBooksToRender} />} />
          <Route path="/books/:id" element={<BookDetail key={Math.random()} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/success" element={<Success />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </ApolloProvider>
  );
}

export default App;
