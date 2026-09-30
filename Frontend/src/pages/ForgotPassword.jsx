import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { forgotPassword } from '../services/auth.service';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email.');
    } catch (err) {
      toast.error(err.message || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Forgot Password?</h2>
          <p className="text-xs text-slate-500">
            Enter your account email and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <p className="text-sm font-semibold text-emerald-900">Check Your Email</p>
            <p className="text-xs text-emerald-700">
              We sent a password reset link to <span className="font-bold">{email}</span>.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs font-bold text-indigo-600 hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full"
            >
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
