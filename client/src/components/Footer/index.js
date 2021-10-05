import React from "react";

export default function Footer() {

  // get current year
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer p-3 bg-light mt-3">
        <div className="container my-3 mx-auto text-center">
          <h5 className="mx-3">Made by Team <i className="fas fa-dice-three"></i></h5>
          <p>©️ {year} All rights reserved</p>
        </div>
    </footer>
  )
};