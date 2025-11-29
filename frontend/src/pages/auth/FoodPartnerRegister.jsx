import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FoodPartnerRegister() {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const name = event.target.businessName.value?.trim();
      const email = event.target.email.value?.trim();
      const address = event.target.address.value?.trim();
      const contact = Number(event.target.contactPhone.value?.trim());
      const password = event.target.password.value?.trim();
      
      if (!name || !email || !address || !contact || !password) {
        alert('All fields are required');
        return;
      }
      
      console.log('Sending data:', { name, email, contact, password, address });
      
      const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', {
        name,
        email,
        contact,
        password,
        address,
      }, {
        withCredentials: true
      });
      console.log('Registration successful:', response.data);
      navigate('/create-food');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo">foodview</span>
            <h1 className="auth-title">Partner With Us</h1>
            <p className="auth-subtitle">Register your food business and start selling</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="businessName">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                className="form-input"
                placeholder="Your restaurant or food business name"
                required
              />
              <span className="form-error">Business name is required</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Business Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="business@example.com"
                required
              />
              <span className="form-error">Please enter a valid email</span>
            </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">
                  Business Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="form-input"
                  placeholder="Street, city, state or full address"
                  required
                />
                <span className="form-error">Please enter your business address</span>
              </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactPhone">
                Contact Phone
              </label>
              <input
                id="contactPhone"
                type="tel"
                className="form-input"
                placeholder="+1 (555) 123-4567"
                required
              />
              <span className="form-error">Please enter a valid phone number</span>
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
                required
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
                I agree to the Partner Terms & Conditions
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Register Business
            </button>
          </form>

          <div className="auth-footer">
            <span className="auth-footer-text">
              Already registered?
              <a href="/food-partner/login" className="auth-footer-link">
                Sign In
              </a>
            </span>
          </div>

          <div className="form-divider">
            <span className="form-divider-text">or</span>
          </div>

          <div className="auth-footer" style={{ marginTop: '16px', paddingTop: '0', borderTop: 'none' }}>
            <span className="auth-footer-text">
              Are you a customer?
              <a href="/user/register" className="auth-footer-link">
                Register as user
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
