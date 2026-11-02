import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../utils/api';

const OrdersHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/orders/my-orders');
        if (res.data) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-tertiary-container/20 text-tertiary';
      case 'Shipped':
        return 'bg-primary-fixed text-on-primary-fixed';
      case 'Confirmed':
      case 'Processing':
        return 'bg-amber-100 text-amber-800';
      case 'Cancelled':
        return 'bg-error-container text-error';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Title */}
      <div className="border-b border-surface-container-high pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface">Order History & Tracking</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Track real-time shipment progress and review past orders.
          </p>
        </div>
        <Link
          to="/shop"
          className="self-start sm:self-auto px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          <span>Browse Catalog</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-surface-container-lowest border border-surface-container-high">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">
            receipt_long
          </span>
          <h3 className="text-headline-sm font-semibold text-on-surface">No Orders Found</h3>
          <p className="text-body-sm text-outline mt-1 max-w-sm mx-auto">
            You haven't placed any orders with ShopEase yet. Browse our catalog to place your first order!
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-xs"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-headline-sm font-bold font-mono text-on-surface">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-label-sm font-bold uppercase tracking-wider ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-outline text-label-sm mt-1">
                    Booked on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-label-sm text-outline block">Total Amount</span>
                    <span className="text-headline-md font-bold text-primary font-mono">
                      ₹{Number(order.totalPrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                    className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{selectedOrder?._id === order._id ? 'Close Details' : 'View Tracking'}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      {selectedOrder?._id === order._id ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex items-center gap-4 overflow-x-auto py-1 custom-scrollbar">
                {order.items?.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low shrink-0 border border-surface-container-high"
                  >
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-12 h-12 object-contain rounded bg-white p-1"
                    />
                    <div className="max-w-[200px]">
                      <p className="font-semibold text-on-surface text-body-sm truncate">{it.title}</p>
                      <p className="text-outline text-label-sm">
                        Qty: {it.quantity} × ₹{Number(it.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Live Tracking Step Drawer */}
              {selectedOrder?._id === order._id && (
                <div className="mt-4 p-5 rounded-xl bg-surface-container-low/70 border border-surface-container-high space-y-4 animate-fadeIn">
                  <h4 className="font-semibold text-on-surface text-body-md flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
                    Shipment Journey & Events
                  </h4>

                  <div className="space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-container/30">
                    {order.trackingSteps && order.trackingSteps.length > 0 ? (
                      order.trackingSteps.map((step, sIdx) => (
                        <div key={sIdx} className="relative">
                          <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white"></span>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-bold text-on-surface text-body-sm">{step.status}</span>
                            <span className="text-outline text-label-sm">
                              {new Date(step.timestamp).toLocaleString()}
                            </span>
                          </div>
                          {step.note && <p className="text-body-sm text-outline mt-0.5">{step.note}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-body-sm text-outline">Tracking initiated. Awaiting carrier scan.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersHistoryPage;

