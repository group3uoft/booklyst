  
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {

  return (
      <nav className="navbar navbar-expand-lg nav-hide">
        <div className="nav-links mx-3">
          <ul className="navbar-nav">
            <li className="nav-item mx-2 width-max">
              <a href="/">Home</a>
            </li>
            <li className="nav-item mx-2 width-max">
              <a href="/">Browse</a>
            </li>
            <li className="nav-item mx-2 width-max">
              <a href="/">My Books</a>
            </li>
          </ul>
        </div>
        <div className="login-container">
          <button 
            type="button" 
            className="btn btn-theme mx-2"
            onClick={() => document.location.assign('/login')}>Login</button>
          <button type="button" className="btn btn-theme">Donate</button>
        </div>
      </nav>
  );
};