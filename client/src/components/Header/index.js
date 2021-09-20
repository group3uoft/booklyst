
import React from 'react';
import Nav from '../../components/Nav';
import { mobileMenuToggle } from "../../utils/helpers";

export default function Header() {
  return (
    <header className="header d-flex justify-content-between p-4 bg-light">
      <div className="logo-container">
        <a href="/">
          <img src="/logo.png" alt="" style={{height: '50px'}}/>
        </a>
      </div>
      <Nav />
      <div id="mobile-nav-icon" className="mobile-nav-icon">
        <div onClick={mobileMenuToggle} id="burgerBtn"></div>
      </div>
    </header>
  )
};