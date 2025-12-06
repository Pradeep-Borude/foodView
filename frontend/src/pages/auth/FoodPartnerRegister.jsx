import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function FoodPartnerRegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/food-partner/register',
        { name, email, contact, password, address },
        { withCredentials: true }
      );

      alert(response.data.message);
      navigate('/food-partner/dashboard');

    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Registration failed";
      alert(msg);
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
              <label className="form-label">Business Name</label>
              <input 
                type="text" 
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your restaurant or food business name"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Business Email</label>
              <input 
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="business@example.com"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Business Address</label>
              <input 
                type="text"
                className="form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, city, state or full address"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input 
                type="tel"
                className="form-input"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required 
              />
            </div>

            <button type="submit" className="submit-btn">
              Register Business
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
