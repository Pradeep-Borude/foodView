import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav';
import '../../styles/foodPartnerDashboard.css';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    try {
      // Check user
      const userRes = await axios.get(
        'http://localhost:3000/api/auth/user/me',
        { 
          withCredentials: true,
          validateStatus: () => true  
        }
      );

      if (userRes.data?.success) {
        setUser(userRes.data.user);
        setError(null);
      } else {
        navigate('/user/login');
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      navigate('/user/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/user/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Your Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Profile Section */}
      {user && (
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src={
                    user.profilePhoto ||
                    'https://i.pinimg.com/736x/36/80/34/3680348b64995e6c2b7f36461e1404ab.jpg'
                  }
                  alt={user.fullName || 'User'}
                />
              </div>
              <div className="profile-info">
                <h2>{user.fullName}</h2>
                <span className="detail-value">{user.email}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-secondary">Edit Profile</button>
            </div>
          </div>
        </section>
      )}

      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-value">Support</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            ★ <br /> rate us
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Settings</div>
        </div>
      </section>
      <BottomNav />
    </div>
  );
}
