import React from "react";
import { Link } from "react-router-dom";
// import { LOGIN } from '../utils/mutations';
// import Auth from '../utils/auth';

export default function Login() {
  return (
    <div className="body-container d-flex flex-column justify-content-center">
      <h1>Login</h1>
      <div className="auth-container">
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" className="btn btn-theme">Login</button>
          <div className="mt-2">
            <Link to="/signup">Sign up instead</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

