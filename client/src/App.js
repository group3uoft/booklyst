import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import reduxStore
import { Provider } from 'react-redux';
import store from './utils/store';

// import components
import Header from './components/Header';
import Home from './components/Pages/Home';
import Footer from './components/Footer';

// import pages

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Header />
          <Home />
          <Footer />
        </Provider>
      </div>
    </Router>
  );
}

export default App;
