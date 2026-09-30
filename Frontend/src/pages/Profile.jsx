import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Lock, LogOut, Package, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { updateProfile, changePassword } from '../services/user.service';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserState, logout } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postalCode: user?.address?.postalCode || '',
    },
  });

  // Password Change Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors, isSubmitting: changingPass },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onUpdateProfile = async (data) => {
    setSavingProfile(true);
    try {
      const updatedData = {
        name: data.name,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
        },
      };

      const updated = await updateProfile(updatedData);
      updateUserState(updated);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const onChangePassword = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password updated successfully!');
      resetPasswordForm();
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg shadow-indigo-200">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user?.name}</h1>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/orders">
            <Button variant="outline" size="sm">
              <Package className="w-4 h-4 mr-2" /> Order History
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Personal Information</span>
          </h3>

          <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                icon={User}
                error={profileErrors.name}
                {...registerProfile('name', { required: 'Name is required' })}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <Input
                label="Phone Number"
                icon={Phone}
                error={profileErrors.phone}
                {...registerProfile('phone')}
              />
            </div>

            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-4 border-t border-slate-100 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" /> Default Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="123 Market St"
                  error={profileErrors.street}
                  {...registerProfile('street')}
                />
              </div>

              <Input label="City" placeholder="San Francisco" error={profileErrors.city} {...registerProfile('city')} />
              <Input label="State" placeholder="CA" error={profileErrors.state} {...registerProfile('state')} />
              <Input label="Postal Code" placeholder="94105" error={profileErrors.postalCode} {...registerProfile('postalCode')} />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="primary" isLoading={savingProfile}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 h-fit">
          <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <span>Security & Password</span>
          </h3>

          <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.currentPassword}
              {...registerPassword('currentPassword', { required: 'Current password is required' })}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.newPassword}
              {...registerPassword('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.confirmNewPassword}
              {...registerPassword('confirmNewPassword', { required: 'Please confirm password' })}
            />

            <Button type="submit" variant="outline" isLoading={changingPass} className="w-full">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
