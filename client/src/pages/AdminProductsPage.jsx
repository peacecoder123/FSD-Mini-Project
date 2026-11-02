import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../utils/api';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    sku: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    stockCount: 10,
    description: '',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    isFeatured: false,
    isBestSeller: false,
    isHotDeal: false,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/products?limit=50&search=${encodeURIComponent(searchTerm)}`);
      if (res.data && res.data.products) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      brand: '',
      sku: `SKU-${Date.now().toString().slice(-6)}`,
      category: 'Electronics',
      price: '',
      originalPrice: '',
      stockCount: 15,
      description: '',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      isFeatured: false,
      isBestSeller: false,
      isHotDeal: false,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      brand: product.brand,
      sku: product.sku,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stockCount: product.stockCount,
      description: product.description,
      images: product.images || [],
      isFeatured: product.isFeatured || false,
      isBestSeller: product.isBestSeller || false,
      isHotDeal: product.isHotDeal || false,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      await fetchProducts();
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  // Multer Image Upload Integration
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      setUploadingImage(true);
      const res = await apiFetch('/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      if (res.data && res.data.url) {
        setFormData((prev) => ({
          ...prev,
          images: [res.data.url, ...prev.images],
        }));
      }
    } catch (err) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title || !formData.brand || !formData.price || !formData.description) {
      setFormError('Please fill all required fields');
      return;
    }

    try {
      setSaving(true);
      if (editingProduct) {
        await apiFetch(`/products/${editingProduct._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      await fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
              Admin Inventory
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-on-surface">Product Catalog Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search and Count Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
        <div className="w-full sm:w-80 relative">
          <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            placeholder="Search by title, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <span className="text-body-sm text-outline">
          Showing <strong className="text-on-surface">{products.length}</strong> catalog records
        </span>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container-low font-label-sm uppercase text-outline">
              <tr>
                <th className="p-3.5">Item</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-outline">
                    Loading inventory records...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-outline">
                    No products matched your criteria.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || '/placeholder.png'}
                        alt={p.title}
                        className="w-12 h-12 object-contain rounded bg-[#F1F5F9] p-1 shrink-0"
                      />
                      <div className="max-w-xs">
                        <p className="font-semibold text-on-surface line-clamp-1">{p.title}</p>
                        <p className="text-outline text-label-sm">{p.brand}</p>
                      </div>
                    </td>
                    <td className="p-3.5 text-on-surface">{p.category}</td>
                    <td className="p-3.5 font-mono text-outline">{p.sku}</td>
                    <td className="p-3.5 font-bold font-mono text-on-surface">
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          p.stockCount <= 5
                            ? 'bg-error-container text-error'
                            : 'bg-tertiary-container/20 text-tertiary'
                        }`}
                      >
                        {p.stockCount} units
                      </span>
                    </td>
                    <td className="p-3.5 text-on-surface font-semibold">
                      ★ {p.rating} ({p.numReviews})
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
                        title="Edit product"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/20 transition-colors"
                        title="Delete product"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-on-background/40 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <h3 className="text-headline-sm font-bold text-on-surface">
                {editingProduct ? 'Edit Catalog Product' : 'Create New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-outline hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-error-container/30 border border-error text-error text-body-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    SKU Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Books">Books</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Stock Count *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Original Price (₹) (Optional Strikethrough)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Multer Image Upload Area */}
                <div className="sm:col-span-2">
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Upload Local Product Image (Multer Integration)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-body-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-label-sm file:font-semibold file:bg-primary-fixed file:text-primary hover:file:bg-primary hover:file:text-white"
                    />
                    {uploadingImage && (
                      <span className="text-outline text-label-sm">Uploading...</span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Image URL (Or paste external link)
                  </label>
                  <input
                    type="text"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full h-10 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-mono text-[12px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-label-sm font-semibold text-on-surface block mb-1">
                    Product Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Checkbox Flags */}
                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-body-sm">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Featured Flagship</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-body-sm">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-body-sm">
                    <input
                      type="checkbox"
                      checked={formData.isHotDeal}
                      onChange={(e) => setFormData({ ...formData, isHotDeal: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Hot Deal Badge</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold shadow-xs"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;

