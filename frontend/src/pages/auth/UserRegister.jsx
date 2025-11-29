import '../../styles/auth.css';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName,
      email,
      password,
    }, {
      withCredentials: true
    });

    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo">foodview</span>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us and start exploring amazing food</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
              />
              <span className="form-error">Full name is required</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
              />
              <span className="form-error">Please enter a valid email</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Create a strong password"
              />
              <span className="form-error">Password must be at least 6 characters</span>
            </div>

            <div className="checkbox-group">
              <input
                id="terms"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the Terms & Conditions
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <span className="auth-footer-text">
              Already have an account?
              <a href="/user/login" className="auth-footer-link">
                Sign In
              </a>
            </span>
          </div>

          <div className="form-divider">
            <span className="form-divider-text">or</span>
          </div>

          <div className="auth-footer" style={{ marginTop: '16px', paddingTop: '0', borderTop: 'none' }}>
            <span className="auth-footer-text">
              Are you a food partner?
              <a href="/food-partner/register" className="auth-footer-link">
                Register your business
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
