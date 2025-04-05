
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ShopFront</h3>
            <p>Your one-stop shop for all your needs. Quality products at competitive prices.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@shopfront.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ShopFront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
