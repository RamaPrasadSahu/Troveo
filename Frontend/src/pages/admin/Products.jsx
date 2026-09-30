import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { getProducts, deleteProduct } from '../../services/product.service';
import { formatCurrency } from '../../utils/formatCurrency';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts({ limit: 50 });
      setProducts(res.products || []);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(productToDelete._id);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      toast.success(`Deleted product "${productToDelete.name}"`);
      setProductToDelete(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Back to Dashboard Link */}
      <div>
        <Link to="/admin" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Products</h1>
          <p className="text-sm text-slate-500 mt-1">Total {products.length} products in store</p>
        </div>

        <Link to="/admin/products/add">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Table */}
      {loading ? (
        <Loader text="Loading products catalog..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchProducts} />
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-xl bg-slate-100 border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{prod.name}</p>
                          <p className="text-xs text-slate-400">ID: {prod._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-indigo-600 capitalize">
                      {prod.category}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {formatCurrency(prod.discountPrice || prod.price)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        prod.stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {prod.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link to={`/admin/products/edit/${prod._id}`}>
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setProductToDelete(prod)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Confirm Delete Product"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete <span className="font-bold text-slate-900">&ldquo;{productToDelete?.name}&rdquo;</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setProductToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" isLoading={deleting} onClick={handleDeleteConfirm}>
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
