import '../../styles/home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav';

export default function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hasUser = document.cookie.includes("userToken=");
    const init = async () => {
if(hasUser){
  await fetchUserData();

}
    };
    init();
  }, []);

const fetchUserData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/user/me",
      { withCredentials: true }
    );

    const u = response.data.user._id;
    setUser(u);
    setError(null);

    await fetchCartItems(u);
  } catch (err) {

    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message;

      if (status === 401) {
        console.log(message);
        return;
      }

      setError(message || "Something went wrong");
    } else {
      console.log("Network error:", err);
      setError("Network Error");
    }

  } finally {
  }
};

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/food/cart/${userId}`,
        { withCredentials: true }
      );

      setCartItems(response.data.cartItem);
      setError(null);
    } catch (err) {
      console.log('error fetching cart', err);
      setError('Failed to load cart items');
    }
  };

  const removeFromCart = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this product from cart ?')) return;

    try {
    const  response = await axios.delete(`http://localhost:3000/api/food/remove-from-cart/${itemId}`, {
        withCredentials: true,
      });
      setCartItems(prev =>
        prev.filter(item => item.foodItem._id !== itemId)
      );
      alert(response.data.message)
    } catch (err) {
      alert('Failed to delete product');
    }
  }


  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">🛒 Your Cart</h1>
        <p className="hero-subtitle">Review and manage your items</p>
      </div>

      <div className="products-section">
        {error && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--text-secondary)',
            }}
          >
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              Your cart is empty
            </p>
            <button
              onClick={() => navigate('/')}
              className="add-to-cart-btn"
              style={{ padding: '10px 20px' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {cartItems.map((item) => (
              <div key={item._id} className="product-card">
                <div className="product-image">
                  <img
                    src={item.foodItem?.image || 'https://via.placeholder.com/200'}
                    alt={item.foodItem?.name || 'Food item'}
                  />
                </div>
                <div className="product-details">
                  <h4>{item.foodItem?.name}</h4>
                  <p className="product-desc">
                    {item.foodItem?.description}
                  </p>
                  <div className="product-meta">
                    <span className="price">₹{item.foodItem?.price}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="product-meta">
                    <button className="btn-small btn-danger"
                      onClick={() => removeFromCart(item.foodItem._id)}
                    >delete</button>
                    <button className="btn-small btn-danger" >order</button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
