import React from 'react';
import axios from 'axios';
import '../App.css';
import './Login.css';

const Login = () => {
  return (
    <div className="Login">
      <div className="container">
        <h1 className="pb-5">Login Here</h1>
        <div className="form-group">
          <label for="email">Email Address</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
          <small className="form-text text-muted">Please use your company email.</small>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" aria-describedby="passwordHelp" />
          <small className="form-text text-muted">Use a strong password.</small>
        </div>
        <div className="form-group">
          <a href="/sales">
            <button type="submit" className="btn btn-primary">Login</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
