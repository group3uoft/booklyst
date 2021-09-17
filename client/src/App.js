import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';

// import reduxStore
import { Provider } from 'react-redux';
import store from './utils/store';

// import components
import Header from './components/Header';
import Home from './components/Pages/Home';
import Footer from './components/Footer';
import Login from './components/Pages/Login'
import Signup from './components/Pages/Signup'

// import pages

function App() {
  return (
  // <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Provider store={store}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
          <Footer />
        </Provider>
      </div>
    </Router>
  // </ApolloProvider>
  );
}

export default App;
