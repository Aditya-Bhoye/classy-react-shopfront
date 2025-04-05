
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">ShopFront</Link>
        
        {/* Mobile menu toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="menu-icon"></span>
        </button>
        
        {/* Navigation menu */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            
            {user ? (
              <>
                <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link></li>
                {user.role === 'admin' && (
                  <li><Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link></li>
                )}
                <li><button className="nav-btn" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>
        
        {/* Cart icon with item count */}
        <Link to="/cart" className="cart-icon" onClick={() => setMobileMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
