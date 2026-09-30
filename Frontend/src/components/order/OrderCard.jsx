import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderCard = ({ order }) => {
  if (!order) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const statusColors = {
    Ordered: 'bg-blue-50 text-blue-700 border-blue-200',
    Confirmed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    'Out for Delivery': 'bg-amber-50 text-amber-700 border-amber-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Order ID</span>
            <h4 className="text-sm font-bold text-slate-900">{order._id}</h4>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              statusColors[order.orderStatus] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {order.orderStatus}
          </span>
          <Link
            to={`/orders/${order._id}`}
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Details <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>

      <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block mb-0.5">Date Placed</span>
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formatDate(order.createdAt)}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block mb-0.5">Items</span>
          <span className="font-semibold text-slate-700">
            {order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0} Products
          </span>
        </div>

        <div>
          <span className="text-slate-400 block mb-0.5">Payment</span>
          <span className="font-semibold text-slate-700">
            {order.paymentStatus} ({order.paymentMethod})
          </span>
        </div>

        <div>
          <span className="text-slate-400 block mb-0.5">Total Amount</span>
          <span className="font-bold text-slate-900 text-sm">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Items Preview */}
      {order.items && order.items.length > 0 && (
        <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto">
          {order.items.slice(0, 4).map((item, i) => (
            <img
              key={i}
              src={
                item.product?.images?.[0] ||
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
              }
              alt={item.product?.name || 'Product'}
              className="w-12 h-12 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-200"
            />
          ))}
          {order.items.length > 4 && (
            <span className="text-xs font-semibold text-slate-500 pl-2">
              +{order.items.length - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
