import '../../styles/home.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const navigate = useNavigate();

  const decideRedirect = async () => {
    try {
      const partnerRes = await axios.get(
        'http://localhost:3000/api/auth/food-partner/me',
        { withCredentials: true }
      );
      if (partnerRes.data?.success) {
        navigate('/food-partner/dashboard');
        return;
      }
    } catch (e) {}

    try {
      const userRes = await axios.get(
        'http://localhost:3000/api/auth/user/me',
        { withCredentials: true }
      );
      if (userRes.data?.success) {
        // already on user profile; no redirect needed
        navigate('/user');

        return;
      }
    } catch (e) {}

    // not logged in as user or partner
    navigate('/user/login');
  };

  useEffect(() => {
    decideRedirect();
  }, []); // run once when /user page opens

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">👤 My Account</h1>
        <p className="hero-subtitle">Manage your profile and preferences</p>
      </div>

      <div className="products-section">
        <div
          style={{
            padding: '30px 20px',
            color: 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>👤</div>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>Welcome!</p>
            <p style={{ marginBottom: '30px' }}>Please sign in to view your profile</p>
            <button
              onClick={() => navigate('/user/login')}
              className="add-to-cart-btn"
              style={{ padding: '10px 20px' }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <nav className="navbar-bottom">
        <div className="navbar-item" onClick={() => navigate('/')}>
          <div className="navbar-icon">🏠</div>
          <div className="navbar-label">Home</div>
        </div>

        <div className="navbar-item" onClick={() => navigate('/cart')}>
          <div className="navbar-icon">🛒</div>
          <div className="navbar-label">Cart</div>
          <div className="cart-badge">0</div>
        </div>

        <div className="navbar-item" onClick={() => navigate('/orders')}>
          <div className="navbar-icon">📦</div>
          <div className="navbar-label">Orders</div>
        </div>

        <div className="navbar-item active" onClick={() => navigate('/user')}>
          <div className="navbar-icon">👤</div>
          <div className="navbar-label">Account</div>
        </div>
      </nav>
    </div>
  );
}
