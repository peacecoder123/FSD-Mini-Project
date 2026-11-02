import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../utils/api';

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/admin/dashboard');
      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await apiFetch(`/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchDashboardData();
    } catch (err) {
      alert(`Failed to update order status: ${err.message}`);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { metrics, lowStockProducts, recentOrders, topProducts, revenueChart } = data || {};

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Subnav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
              Management Portal
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-on-surface">Store Operations & Telemetry</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg bg-primary text-white font-label-md font-semibold shadow-xs"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container-low font-label-md font-semibold transition-colors"
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container-low font-label-md font-semibold transition-colors"
          >
            Orders
          </Link>
        </div>
      </div>

      {/* 1. Metrics Cards (4 Cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2">
          <div className="flex items-center justify-between text-outline">
            <span className="text-label-sm font-bold uppercase tracking-wider">Total Revenue</span>
            <span className="p-2 rounded-lg bg-primary-fixed text-primary material-symbols-outlined text-[20px]">
              currency_rupee
            </span>
          </div>
          <p className="text-headline-lg font-bold font-mono text-on-surface">
            ₹{Number(metrics?.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[12px] text-tertiary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +18.4% this quarter
          </span>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2">
          <div className="flex items-center justify-between text-outline">
            <span className="text-label-sm font-bold uppercase tracking-wider">Total Orders</span>
            <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
          </div>
          <p className="text-headline-lg font-bold font-mono text-on-surface">
            {metrics?.totalOrders || 0}
          </p>
          <div className="flex items-center gap-2 text-[12px] text-outline">
            <span>Delivered: <strong className="text-on-surface">{metrics?.deliveredOrders || 0}</strong></span>
            <span>•</span>
            <span>Pending: <strong className="text-amber-600">{metrics?.pendingOrders || 0}</strong></span>
          </div>
        </div>

        {/* Total Products */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2">
          <div className="flex items-center justify-between text-outline">
            <span className="text-label-sm font-bold uppercase tracking-wider">Catalog SKUs</span>
            <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">
              inventory_2
            </span>
          </div>
          <p className="text-headline-lg font-bold font-mono text-on-surface">
            {metrics?.totalProducts || 0}
          </p>
          <span className="text-[12px] text-outline">Across 6 active disciplines</span>
        </div>

        {/* Total Customers */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2">
          <div className="flex items-center justify-between text-outline">
            <span className="text-label-sm font-bold uppercase tracking-wider">Registered Shoppers</span>
            <span className="p-2 rounded-lg bg-primary-fixed text-primary material-symbols-outlined text-[20px]">
              group
            </span>
          </div>
          <p className="text-headline-lg font-bold font-mono text-on-surface">
            {metrics?.totalCustomers || 0}
          </p>
          <span className="text-[12px] text-tertiary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Active verified member sessions
          </span>
        </div>
      </div>

      {/* 2. Revenue Chart & Top Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Trend SVG Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-headline-sm font-semibold text-on-surface">Revenue Growth Vector</h3>
              <p className="text-body-sm text-outline">6-month monthly gross billing trajectory</p>
            </div>
            <span className="text-label-sm font-bold uppercase bg-surface-container text-primary px-3 py-1 rounded-full">
              Trailing 6 Months
            </span>
          </div>

          {/* SVG Bar / Area visualization */}
          <div className="pt-4 h-64 flex items-end justify-between gap-4 px-2">
            {revenueChart?.map((m, idx) => {
              const maxRev = 500000;
              const heightPct = Math.min(100, Math.max(15, (m.revenue / maxRev) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono font-bold text-primary">
                    ₹{Number(m.revenue).toLocaleString('en-IN')}
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-primary-fixed hover:bg-primary-container rounded-t-lg transition-all duration-300 relative"
                  ></div>
                  <span className="text-label-sm font-semibold text-outline group-hover:text-on-surface">
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Rated Products (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <h3 className="text-headline-sm font-semibold text-on-surface">Top Flagships</h3>
          <div className="divide-y divide-surface-container-high">
            {topProducts?.map((tp) => (
              <div key={tp._id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={tp.images?.[0]}
                    alt={tp.title}
                    className="w-10 h-10 object-contain rounded bg-[#F1F5F9] p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface text-body-sm truncate">{tp.title}</p>
                    <p className="text-outline text-label-sm">₹{Number(tp.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-body-sm shrink-0">
                  <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                  <span>{tp.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Low Stock Alerts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-sm font-semibold text-on-surface">Recent Orders</h3>
            <Link to="/admin/orders" className="text-primary hover:underline text-label-sm font-semibold">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low font-label-sm uppercase text-outline">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {recentOrders?.map((ord) => (
                  <tr key={ord._id} className="hover:bg-surface-container-low/50">
                    <td className="p-3 font-mono font-semibold text-on-surface">{ord.orderNumber}</td>
                    <td className="p-3 text-on-surface">{ord.user?.name || 'Customer'}</td>
                    <td className="p-3 font-bold font-mono text-on-surface">
                      ₹{Number(ord.totalPrice).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-on-surface-variant">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        disabled={updatingOrderId === ord._id}
                        value={ord.status}
                        onChange={(e) => handleStatusUpdate(ord._id, e.target.value)}
                        className="text-label-sm py-1 px-2 rounded border border-surface-container-high bg-surface-container-lowest text-on-surface cursor-pointer"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <h3 className="text-headline-sm font-semibold text-on-surface">Low Stock Alerts</h3>
            </div>
            <Link to="/admin/products" className="text-primary hover:underline text-label-sm font-semibold">
              Manage Stock
            </Link>
          </div>

          {(!lowStockProducts || lowStockProducts.length === 0) ? (
            <p className="text-body-sm text-outline py-4">All catalog products have healthy inventory buffers.</p>
          ) : (
            <div className="divide-y divide-surface-container-high">
              {lowStockProducts.map((lsp) => (
                <div key={lsp._id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-on-surface text-body-sm line-clamp-1">{lsp.title}</p>
                    <span className="text-outline text-label-sm font-mono">{lsp.sku}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-error-container text-error">
                    {lsp.stockCount} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

