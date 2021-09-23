import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { SIGNUP } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup() {
  const [ formState, setFormState ] = useState({username: '', email: '', password: '' });
  const [ login, { error }] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {username: formState.username, email: formState.email, password: formState.password }
      });
      const token = response.data.createUser.token;
      Auth.login(token);
      setFormState({username: '', email: '', password: '' });
    } catch (e) {
      console.error(e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({...formState, [name]: value});
  }

  return (
    <div className="body-container d-flex flex-column justify-content-center">
      <h1 className="text-center">Sign up</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit} id="login-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input onChange={handleChange} name="username" className="form-control" id="username" aria-describedby="emailHelp" value={formState.username} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={handleChange} name="email" className="form-control" type="email" id="email" aria-describedby="emailHelp" value={formState.email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={handleChange} name="password" className="form-control" id="password" value={formState.password} type="password" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Sign up for free offers</label>
          </div>
          <button type="submit" className="btn btn-theme">Signup</button>
          <div className="mt-2">
            <Link to="/login">Login instead</Link>
          </div>
        </form>
      </div>
    </div>
  )
}