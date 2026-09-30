import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Package } from 'lucide-react';
import OrderStatus from '../components/order/OrderStatus';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { getOrderById } from '../services/order.service';
import { formatCurrency } from '../utils/formatCurrency';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader fullScreen text="Loading order details..." />;
  if (error || !order) return <ErrorMessage message={error || 'Order not found'} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <div>
        <Link to="/orders" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Orders
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            Order Reference
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
            {order._id}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'full' })}
          </p>
        </div>

        {order.trackingNumber && (
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs">
            <span className="text-indigo-600 font-medium block">Tracking Number</span>
            <span className="font-mono font-bold text-indigo-900">{order.trackingNumber}</span>
          </div>
        )}
      </div>

      {/* Visual Timeline Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
          Order Status Tracker
        </h3>
        <OrderStatus status={order.orderStatus} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ordered Products Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
              <Package className="w-5 h-5 text-indigo-600" />
              <span>Items Purchased ({order.items?.length || 0})</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {order.items?.map((item, index) => {
                const prod = item.product || {};
                return (
                  <div key={index} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={prod.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
                        alt={prod.name || 'Product'}
                        className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <Link to={`/products/${prod._id}`} className="text-sm font-semibold text-slate-900 hover:text-indigo-600">
                          {prod.name || 'Product Item'}
                        </Link>
                        <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency((item.price || prod.discountPrice || prod.price) * item.quantity)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Summary & Delivery info */}
        <div className="space-y-6">
          {/* Shipping Address Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Shipping Destination</span>
            </h3>
            {order.shippingAddress ? (
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-900 text-sm">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p className="pt-1 text-slate-400">Phone: {order.shippingAddress.phone}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Address info unavailable</p>
            )}
          </div>

          {/* Payment & Total Breakdown */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payment Summary</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Payment Method</span>
                <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Status</span>
                <span className="font-bold text-emerald-600">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'FREE' : formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Paid</span>
                <span className="text-indigo-600">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
