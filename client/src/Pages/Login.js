import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { LOGIN } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';

export default function Login() {
  const [ formState, setFormState ] = useState({ email: '', password: '' });
  const [ login, { error }] = useMutation(LOGIN);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: { email: formState.email, password: formState.password }
      });
      const token = response.data.loginUser.token;
      Auth.login(token);
      setFormState({ email: '', password: '' });
      if (!response) {
        throw new Error('something went wrong!');
      }
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({...formState, [name]: value});
  }

  return (
    <div className="body-container d-flex flex-column justify-content-center">
       <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
      <h1 className="text-center">Login</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit} id="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={handleChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" value={formState.email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={handleChange} name="password" className="form-control" id="password" value={formState.password} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" className="btn btn-theme">Login</button>
          <div className="mt-2">
            <Link to="/signup">Sign up instead</Link>
          </div>
          {error && <div>Login failed</div>}
        </form>
      
      </div>
     
    </div>
  )
}

