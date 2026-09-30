import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, UserPlus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerAuth(data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Create your Account</h2>
          <p className="text-xs text-slate-500">Join ShopSphere for exclusive offers & fast checkout.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.fullName}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            error={errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.confirmPassword}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === password || 'Passwords do not match',
            })}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full mt-2"
          >
            <UserPlus className="w-4 h-4 mr-2" /> Register Account
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
