
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';
import { useState } from 'react';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    totalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(true);
      
      // Redirect to home after successful checkout
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  if (checkoutSuccess) {
    return (
      <div className="container">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will be redirected to the homepage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button 
              className="btn" 
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.product.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decreaseQuantity(item.product.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => increaseQuantity(item.product.id)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-subtotal">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="summary-item">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn checkout-btn" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn btn-secondary continue-btn" 
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
