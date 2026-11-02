import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../utils/api';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/orders');
      if (res.data) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus, note = '') => {
    try {
      setUpdatingOrderId(orderId);
      await apiFetch(`/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus, note }),
      });
      await fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        const updated = await apiFetch(`/orders/${orderId}`);
        setSelectedOrder(updated.data);
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchSearch =
      searchTerm.trim() === '' ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
              Admin Logistics
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-on-surface">Customer Order Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container-low font-label-md font-semibold transition-colors"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-colors ${
                filterStatus === st
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 relative">
          <span className="material-symbols-outlined text-[18px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container-low font-label-sm uppercase text-outline">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer & Destination</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total & Method</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-outline">
                    Loading orders database...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-outline">
                    No matching orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-primary">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <p className="font-semibold text-on-surface">{ord.shippingAddress?.fullName}</p>
                      <p className="text-outline text-label-sm">
                        {ord.shippingAddress?.city}, {ord.shippingAddress?.country}
                      </p>
                    </td>
                    <td className="p-3.5 text-on-surface">{ord.items?.length || 0} line items</td>
                    <td className="p-3.5">
                      <p className="font-bold font-mono text-on-surface">₹{Number(ord.totalPrice).toLocaleString('en-IN')}</p>
                      <span className="text-label-sm text-outline uppercase">{ord.paymentMethod}</span>
                    </td>
                    <td className="p-3.5">
                      <select
                        disabled={updatingOrderId === ord._id}
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                        className="text-label-sm py-1 px-2.5 rounded-lg border border-surface-container-high bg-surface-container-low text-on-surface font-semibold cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-outline text-label-sm">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface text-label-sm font-semibold transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-on-background/40 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-2xl p-6 sm:p-8 space-y-5 z-10">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div>
                <h3 className="text-headline-sm font-bold text-on-surface">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <p className="text-outline text-label-sm">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-outline hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-on-surface text-body-sm">Order Items</h4>
              <div className="divide-y divide-surface-container-high border border-surface-container-high rounded-lg p-2 max-h-48 overflow-y-auto">
                {selectedOrder.items?.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <img src={it.image} alt={it.title} className="w-8 h-8 object-contain rounded bg-white p-0.5" />
                      <span className="font-medium text-on-surface line-clamp-1">{it.title}</span>
                    </div>
                    <span className="font-mono text-outline">
                      {it.quantity} × ₹{Number(it.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-body-sm pt-2">
                <div>
                  <span className="text-outline text-label-sm block">Recipient Address</span>
                  <p className="font-semibold text-on-surface">{selectedOrder.shippingAddress?.fullName}</p>
                  <p className="text-on-surface-variant text-label-sm">
                    {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}
                  </p>
                  <p className="text-outline text-label-sm">Phone: {selectedOrder.shippingAddress?.phone}</p>
                </div>

                <div className="text-right">
                  <span className="text-outline text-label-sm block">Financial Breakdown</span>
                  <p className="text-on-surface-variant">Items: ₹{Number(selectedOrder.itemsPrice).toLocaleString('en-IN')}</p>
                  <p className="text-on-surface-variant">Shipping: ₹{Number(selectedOrder.shippingPrice).toLocaleString('en-IN')}</p>
                  <p className="font-bold text-headline-sm text-primary font-mono mt-1">
                    Total: ₹{Number(selectedOrder.totalPrice).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-container-high">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-lg bg-primary text-white font-label-md font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;

