import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function FoodPartnerLogin() {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await axios.post('http://localhost:3000/api/auth/food-partner/login', {
      email,
      password,
    }, {
      withCredentials: true
    });
    console.log('Login successful:', response.data);
    navigate('/create-food');
  };


  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo">foodview</span>
            <h1 className="auth-title">Partner Login</h1>
            <p className="auth-subtitle">Manage your food business account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Business Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="business@example.com"
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
                placeholder="Enter your password"
              />
              <span className="form-error">Password is incorrect</span>
            </div>

            <div className="checkbox-group">
              <input
                id="rememberMe"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me for 30 days
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <div className="form-divider">
            <span className="form-divider-text">or</span>
          </div>

          <div className="auth-footer">
            <span className="auth-footer-text">
              New to our platform?
              <a href="/food-partner/register" className="auth-footer-link">
                Register your business
              </a>
            </span>
          </div>

          <div className="auth-footer" style={{ marginTop: '16px', paddingTop: '0', borderTop: 'none' }}>
            <a href="/forgot-password" className="auth-footer-link" style={{ marginLeft: '0' }}>
              Forgot your password?
            </a>
          </div>

          <div className="form-divider">
            <span className="form-divider-text">or</span>
          </div>

          <div className="auth-footer" style={{ marginTop: '16px', paddingTop: '0', borderTop: 'none' }}>
            <span className="auth-footer-text">
              Are you a customer?
              <a href="/user/login" className="auth-footer-link">
                Sign in here
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
