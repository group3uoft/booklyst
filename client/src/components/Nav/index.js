  
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {

  return (
      <nav className="navbar navbar-expand-lg">
        <div className="nav-links mx-3">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <a href="/">Home</a>
            </li>
            <li className="nav-item mx-2">
              <a href="/">Browse</a>
            </li>
            <li className="nav-item mx-2">
              <a href="/">My Books</a>
            </li>
          </ul>
        </div>
        <div className="login-container">
          <button type="button" className="btn btn-theme">Login</button>
          <button type="button" className="btn btn-theme mx-3">Donate</button>
      </div>
      </nav>
  );
};