import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import OrderCard from '../components/order/OrderCard';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import { getUserOrders } from '../services/order.service';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader fullScreen text="Loading your order history..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={Package}
          title="No Orders Placed Yet"
          description="You haven't made any purchases yet. Start exploring our wide selection of products!"
          action={
            <Link to="/products">
              <Button variant="primary">Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Order History</h1>
        <p className="text-sm text-slate-500 mt-1">
          Viewing {orders.length} past {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
