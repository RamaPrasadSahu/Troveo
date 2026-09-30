import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ShieldCheck, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../services/order.service';
import { PAYMENT_METHODS } from '../utils/constants';

const Checkout = () => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  const shipping = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 5.99;
  const tax = cartSubtotal * 0.08;
  const totalAmount = cartSubtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      phone: user?.phone || '',
      address: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postalCode: user?.address?.postalCode || '',
    },
  });

  const onSubmitOrder = async (data) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        items: cart,
        shippingAddress: data,
        paymentMethod: PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.name || 'Credit Card',
        subtotal: cartSubtotal,
        tax,
        shippingCost: shipping,
        totalAmount,
      };

      const created = await createOrder(orderPayload);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-success/${created._id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-sm text-slate-500">Add items to cart before proceeding to checkout.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Shop Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">Secure Checkout</h1>
        <p className="text-sm text-slate-500 mt-1">Please enter your shipping and payment details.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitOrder)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Shipping Address</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                error={errors.fullName}
                {...register('fullName', { required: 'Full name is required' })}
              />

              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                error={errors.phone}
                {...register('phone', { required: 'Phone number is required' })}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="123 Market Street, Apt 4B"
                  error={errors.address}
                  {...register('address', { required: 'Street address is required' })}
                />
              </div>

              <Input
                label="City"
                placeholder="San Francisco"
                error={errors.city}
                {...register('city', { required: 'City is required' })}
              />

              <Input
                label="State / Province"
                placeholder="California"
                error={errors.state}
                {...register('state', { required: 'State is required' })}
              />

              <Input
                label="Postal / Zip Code"
                placeholder="94105"
                error={errors.postalCode}
                {...register('postalCode', { required: 'Postal code is required' })}
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Payment Option</h3>
            </div>

            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{method.name}</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </label>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 pt-4">
                <p className="text-xs text-slate-500 font-medium">Demo Card Details (Backend Ready)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Card Number (4532 •••• •••• 8892)"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      disabled
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={submitting}
            className="w-full py-4 text-base"
          >
            <ShieldCheck className="w-5 h-5 mr-2" /> Complete & Pay Order
          </Button>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:sticky lg:top-24">
          <CartSummary showCheckoutBtn={false} />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
