import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/foodPartnerDashboard.css';
import BottomNav from '../../components/BottomNav';

export default function FoodPartnerDashboard() {
  const [foodPartner, setFoodPartner] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await fetchFoodPartnerData();
    };
    init();
  }, []);

  const fetchFoodPartnerData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/auth/food-partner/me',
        { withCredentials: true }
      );

      const partner = response.data.partner;
      setFoodPartner(partner);
      setError(null);

      await fetchFoodItems(partner._id);
    } catch (err) {
      console.error('Error fetching food partner data:', err);

      if (err.response?.status === 401) {
        navigate('/food-partner/login');
        return;
      }

      setError('Failed to load partner profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodItems = async (partnerId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/food/${partnerId}`,
        { withCredentials: true }
      );

      setFoodItems(response.data.foodItems || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching food items:', err);

      if (err.response?.status === 401) {
        navigate('/food-partner/login');
        return;
      }

      setError('Failed to load food items');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/food-partner/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      alert('Logout failed');
    }
  };

  const handleDeleteFoodItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/food/${itemId}`, {
        withCredentials: true,
      });
      setFoodItems((prev) => prev.filter((p) => p._id !== itemId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
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
      <header className="dashboard-header">
        <h1>Food Partner Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Profile Section */}
      {foodPartner && (
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src={
                    foodPartner.profilePhoto ||
                    'https://i.pinimg.com/1200x/e8/f2/43/e8f2438038abc1934e910d7cb67650ad.jpg'
                  }
                  alt={foodPartner.name}
                />
              </div>
              <div className="profile-info">
                <h2>{foodPartner.name}</h2>
                <p className="business-type">Restaurant Partner</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{foodPartner.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{foodPartner.contact}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{foodPartner.address}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-secondary">View Analytics</button>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h3>Your Products</h3>
          <button
            className="btn-primary"
            onClick={() => navigate('/food-partner/add-item')}
          >
            + Add New Product
          </button>
        </div>

        {foodItems.length === 0 ? (
          <div className="no-products">
            <p>No products yet. Start by adding your first product!</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/food-partner/add-item')}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {foodItems.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image || 'https://via.placeholder.com/200'}
                    alt={product.name}
                  />
                  <span className="status-badge available">Available</span>
                </div>
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <p className="product-desc">{product.description}</p>
                  <div className="product-meta">
                    <span className="price">₹{product.price}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button
                    className="btn-small btn-secondary"
                    onClick={() =>
                      navigate(`/food-partner/edit-item/${product._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDeleteFoodItem(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}
