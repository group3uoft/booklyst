import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import components
import Header from './components/Header';
import Home from './components/Pages/Home';
import Footer from './components/Footer';

// import pages

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
