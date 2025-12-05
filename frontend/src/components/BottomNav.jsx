import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/home.css'

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="navbar-bottom">
      <div className={`navbar-item ${pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <div className="navbar-icon">🏠</div>
        <div className="navbar-label">Home</div>
      </div>

      <div className={`navbar-item ${pathname === '/cart' ? 'active' : ''}`} onClick={() => navigate('/cart')}>
        <div className="navbar-icon">🛒</div>
        <div className="navbar-label">Cart</div>
      </div>

      <div className={`navbar-item ${pathname === '/orders' ? 'active' : ''}`} onClick={() => navigate('/orders')}>
        <div className="navbar-icon">📦</div>
        <div className="navbar-label">Orders</div>
      </div>

      <div className={`navbar-item ${pathname === '/user' ? 'active' : ''}`} onClick={() => navigate('/user')}>
        <div className="navbar-icon">👤</div>
        <div className="navbar-label">Account</div>
      </div>
    </nav>
  )
}
