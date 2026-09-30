import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { getAllUsers, updateUserRole } from '../../services/user.service';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      toast.error('Failed to load user list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userObj) => {
    const newRole = userObj.role === 'admin' ? 'user' : 'admin';
    try {
      await updateUserRole(userObj._id, newRole);
      setUsers(users.map((u) => (u._id === userObj._id ? { ...u, role: newRole } : u)));
      toast.success(`Updated ${userObj.name}'s role to ${newRole.toUpperCase()}`);
    } catch (err) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  if (loading) return <Loader fullScreen text="Loading registered users list..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <Link to="/admin" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Link>
      </div>

      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage platform accounts and admin roles</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-400">ID: {u._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        u.role === 'admin'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {u.role ? u.role.toUpperCase() : 'USER'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition"
                    >
                      Toggle Role ({u.role === 'admin' ? 'Make User' : 'Make Admin'})
                    </button>
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

export default AdminUsers;
