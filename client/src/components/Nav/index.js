  
import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { mobileMenuToggle } from "../../utils/helpers";

export default function Nav() {

  return (
      <nav className="navbar navbar-expand-lg nav-hide">
        <div className="nav-links mx-3">
          <ul className="navbar-nav d-mob-none">
            <li className="nav-item mx-2 width-max">
              <Link to="/" onClick={mobileMenuToggle}>Home</Link>
            </li>
            <li className="nav-item mx-2 width-max">
              <Link to="/browse" onClick={mobileMenuToggle}>Browse</Link>
            </li>
            <li className="nav-item mx-2 width-max">
              <Link to="/dashboard" onClick={mobileMenuToggle}>My Books</Link>
            </li>
          </ul>
        </div>
        <div className="login-container d-mob-none">

          <Link to="/donate"
            className="btn btn-theme mx-2" onClick={mobileMenuToggle}>Donate
          </Link>
          {Auth.loggedIn() ? 
            <button 
            type="button" 
            className="btn btn-theme mx-2"
            onClick={Auth.logout}>Logout</button> :
            <Link to="/login"
            className="btn btn-theme mx-2" onClick={mobileMenuToggle}>Login</Link>
             }
        </div>
      </nav>
  );
};