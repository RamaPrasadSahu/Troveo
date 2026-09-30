import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import Loader from '../../components/common/Loader';
import { MOCK_ADMIN_STATS } from '../../utils/mockData';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching admin stats
    setTimeout(() => {
      setStats(MOCK_ADMIN_STATS);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <Loader fullScreen text="Loading dashboard metrics..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Platform Overview</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products/add"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Users</span>
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center">
            +12% from last month
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products Catalog</span>
            <div className="p-2 bg-purple-50 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalProducts}</p>
          <p className="text-xs text-slate-400">Active listings</p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="p-2 bg-amber-50 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats.totalOrders}</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center">
            +8.4% fulfillment rate
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="p-2 bg-emerald-50 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-xs text-emerald-600 font-semibold">Gross sales</p>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-base">Manage Products</h4>
            <p className="text-xs text-slate-500">Add, edit, update inventory</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>

        <Link
          to="/admin/orders"
          className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-base">Manage Orders</h4>
            <p className="text-xs text-slate-500">View and update shipment status</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>

        <Link
          to="/admin/users"
          className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-base">Manage Users</h4>
            <p className="text-xs text-slate-500">Control accounts and access roles</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Recent Customer Orders</h3>
          <Link to="/admin/orders" className="text-xs font-semibold text-indigo-600 hover:underline">
            View All Orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {stats.recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50">
                  <td className="py-3.5 font-bold text-slate-900">{order._id}</td>
                  <td className="py-3.5">{order.shippingAddress?.fullName || 'Customer'}</td>
                  <td className="py-3.5">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-indigo-50 text-indigo-700">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-bold text-slate-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
