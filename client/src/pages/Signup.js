import React from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css';
import './Signup.css';

const Signup = () => {
  return (
    <div className="Signup">
      <div className="container">
        <h1 className="pb-5">Sign Up For An Account</h1>
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" aria-describedby="nameHelp" placeholder="Jacob Smith" />
        </div>
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
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </a>
        </div>
      </div>
      <div className="Signup-redirect">
        <p>Already registered? Sign in <a href="/login">HERE</a>.</p>
      </div>
    </div>
  )
}

export default Signup