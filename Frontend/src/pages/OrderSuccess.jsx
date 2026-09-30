import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import Button from '../components/common/Button';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-100 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
          ORDER CONFIRMED
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Thank You for Your Order!
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Your order <span className="font-bold text-slate-900">{id}</span> has been placed successfully and is now being processed.
        </p>
      </div>

      <div className="p-6 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-3 shadow-xs">
        <div className="flex justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span>Order Reference</span>
          <span className="font-mono font-bold text-slate-900">{id}</span>
        </div>
        <p className="text-xs text-slate-500">
          A confirmation email with your order summary and tracking details will be sent shortly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to={`/orders/${id}`}>
          <Button variant="primary" size="lg">
            <Package className="w-4 h-4 mr-2" /> Track Order Status
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="lg">
            <Home className="w-4 h-4 mr-2" /> Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
