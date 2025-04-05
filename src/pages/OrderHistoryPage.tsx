
import { useEffect, useState } from 'react';
import { OrderType } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { sampleOrders } from '../data/sampleData';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(sampleOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Shipped':
        return 'status-shipped';
      case 'Processing':
        return 'status-processing';
      default:
        return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-10">
        <p>Loading your order history...</p>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <div className="container">
        <h1>Order History</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <div className="item-details">
                        <h3>{item.product.name}</h3>
                        <div className="item-meta">
                          <span>Qty: {item.quantity}</span>
                          <span>${item.product.price.toFixed(2)} each</span>
                        </div>
                      </div>
                      <div className="item-subtotal">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
