import { useEffect, useState } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]); // useState for food items

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/food",
        { withCredentials: true }
      );
      console.log("API response:", response.data.foodItems);

      // Update state with fetched items (triggers re-render)
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
    // TODO: Add to cart logic
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to FoodView</h1>
        <p className="hero-subtitle">Discover delicious food from the best restaurants</p>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="products-header">
          <h2 className="products-title">Popular Dishes</h2>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {foodItems.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt="" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Navbar */}
      <nav className="navbar-bottom">
        <div className="navbar-item active" onClick={() => navigate("/")}>
          <div className="navbar-icon">🏠</div>
          <div className="navbar-label">Home</div>
        </div>

        <div className="navbar-item" onClick={() => navigate("/cart")}>
          <div className="navbar-icon">🛒</div>
          <div className="navbar-label">Cart</div>
          <div className="cart-badge">0</div>
        </div>

        <div className="navbar-item" onClick={() => navigate("/orders")}>
          <div className="navbar-icon">📦</div>
          <div className="navbar-label">Orders</div>
        </div>

        <div className="navbar-item" onClick={() => navigate("/user")}>
          <div className="navbar-icon">👤</div>
          <div className="navbar-label">Account</div>
        </div>
      </nav>
    </div>
  );
}
