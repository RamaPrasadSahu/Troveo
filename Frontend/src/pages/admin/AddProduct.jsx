import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { createProduct } from '../../services/product.service';
import { CATEGORIES } from '../../utils/constants';

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      category: 'electronics',
      price: '',
      discountPrice: '',
      stock: 50,
      description: '',
      imageUrl: '',
      isFeatured: false,
      isTrending: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : undefined,
        discountPercent: data.discountPrice
          ? Math.round(((Number(data.price) - Number(data.discountPrice)) / Number(data.price)) * 100)
          : 0,
        stock: Number(data.stock),
        description: data.description,
        images: data.imageUrl ? [data.imageUrl] : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
        isFeatured: data.isFeatured,
        isTrending: data.isTrending,
      };

      await createProduct(payload);
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.message || 'Failed to create product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <Link to="/admin/products" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Products List
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-xs">
        <h1 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Product Name"
                placeholder="e.g. Wireless Noise-Canceling Earbuds"
                error={errors.name}
                {...register('name', { required: 'Product name is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Stock Quantity"
              type="number"
              placeholder="50"
              error={errors.stock}
              {...register('stock', { required: 'Stock is required' })}
            />

            <Input
              label="Regular Price ($)"
              type="number"
              step="0.01"
              placeholder="199.99"
              error={errors.price}
              {...register('price', { required: 'Price is required' })}
            />

            <Input
              label="Discounted Price ($ Optional)"
              type="number"
              step="0.01"
              placeholder="149.99"
              {...register('discountPrice')}
            />

            <div className="sm:col-span-2">
              <Input
                label="Image URL"
                placeholder="https://images.unsplash.com/..."
                {...register('imageUrl')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Detailed product features and specifications..."
                className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6 pt-4 border-t border-slate-100">
            <label className="flex items-center text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 mr-2" {...register('isFeatured')} />
              Mark as Featured
            </label>
            <label className="flex items-center text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 mr-2" {...register('isTrending')} />
              Mark as Trending
            </label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/products')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              <Plus className="w-4 h-4 mr-2" /> Publish Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
