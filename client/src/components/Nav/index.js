  
import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

export default function Nav() {

  return (
      <nav className="navbar navbar-expand-lg nav-hide">
        <div className="nav-links mx-3">
          <ul className="navbar-nav">
            <li className="nav-item mx-2 width-max">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item mx-2 width-max">
              <Link to="/browse">Browse</Link>
            </li>
            <li className="nav-item mx-2 width-max">
              <Link to="/dashboard">My Books</Link>
            </li>
          </ul>
        </div>
        <div className="login-container">

          <Link to="/donate"
            className="btn btn-theme mx-2">Donate
          </Link>

          {Auth.loggedIn() ? 
            <button 
            type="button" 
            className="btn btn-theme mx-2"
            onClick={Auth.logout}>Logout</button> :
            <Link to="/login"
            className="btn btn-theme mx-2">Login</Link>
             }
        </div>
      </nav>
  );
};