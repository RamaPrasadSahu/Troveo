import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { getAllOrders, updateOrderStatus } from '../../services/order.service';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (err) {
      toast.error('Failed to fetch orders list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    setUpdating(true);
    try {
      const updated = await updateOrderStatus(selectedOrder._id, newStatus);
      setOrders(orders.map((o) => (o._id === selectedOrder._id ? { ...o, orderStatus: newStatus } : o)));
      toast.success(`Updated order ${selectedOrder._id} status to "${newStatus}"`);
      setSelectedOrder(null);
    } catch (err) {
      toast.error(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader fullScreen text="Loading orders list..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <Link to="/admin" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Customer Orders</h1>
          <p className="text-sm text-slate-500 mt-1">Total {orders.length} orders recorded</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{order._id}</td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800">{order.shippingAddress?.fullName || 'Customer'}</p>
                    <p className="text-xs text-slate-400">{order.shippingAddress?.phone}</p>
                  </td>
                  <td className="p-4 text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-xs">
                    <span className="font-bold text-slate-700">{order.paymentMethod}</span> ({order.paymentStatus})
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right font-extrabold text-slate-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setNewStatus(order.orderStatus);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-semibold text-slate-700 rounded-lg transition"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Update Order Status: ${selectedOrder?._id}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select New Order Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
            >
              {Object.values(ORDER_STATUSES).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" isLoading={updating} onClick={handleUpdateStatus}>
              Save Status
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminOrders;
