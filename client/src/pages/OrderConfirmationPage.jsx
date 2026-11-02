import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiFetch from '../utils/api';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/orders/${id}`);
        if (res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        console.error('Failed to load order', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
        <h2 className="text-headline-md font-bold text-on-surface">Order Not Found</h2>
        <Link to="/orders" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg">
          View My Orders
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', active: true },
    { title: 'Confirmed', active: ['Confirmed', 'Shipped', 'Delivered'].includes(order.status) },
    { title: 'Shipped', active: ['Shipped', 'Delivered'].includes(order.status) },
    { title: 'Delivered', active: order.status === 'Delivered' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Success Hero Header */}
      <div className="p-8 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mx-auto shadow-xs">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <h1 className="text-headline-lg font-bold text-on-surface">Thank You! Your Order is Placed</h1>
        <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
          We've received your booking. A confirmation receipt has been dispatched to your email address.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container font-mono text-body-sm border border-surface-container-high">
          <span className="text-outline">Order Identifier:</span>
          <strong className="text-primary font-bold">{order.orderNumber}</strong>
        </div>
      </div>

      {/* Live Tracking Progress Bar */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-headline-sm font-semibold text-on-surface">Order Dispatch Tracker</h3>
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold uppercase">
            Status: {order.status}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 relative">
          {steps.map((st, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-label-sm transition-colors ${
                  st.active
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-high text-outline'
                }`}
              >
                {st.active ? <span className="material-symbols-outlined text-[18px]">check</span> : i + 1}
              </div>
              <span className={`text-label-sm font-semibold ${st.active ? 'text-on-surface' : 'text-outline'}`}>
                {st.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Details & Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Summary */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-3">
          <h4 className="font-semibold text-on-surface text-body-md flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            Shipping Information
          </h4>
          <p className="text-body-sm font-bold text-on-surface">{order.shippingAddress?.fullName}</p>
          <p className="text-body-sm text-on-surface-variant">
            {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
            {order.shippingAddress?.postalCode}
          </p>
          <p className="text-body-sm text-on-surface-variant">Country: {order.shippingAddress?.country}</p>
          <p className="text-body-sm text-outline">Phone: {order.shippingAddress?.phone}</p>
        </div>

        {/* Payment Summary */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-3">
          <h4 className="font-semibold text-on-surface text-body-md flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt</span>
            Payment & Total
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            Method:{' '}
            <strong className="text-on-surface">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Simulated Online Card'}
            </strong>
          </p>
          <p className="text-body-sm text-on-surface-variant">
            Payment Status:{' '}
            <span
              className={`font-semibold ${
                order.isPaid ? 'text-tertiary' : 'text-on-surface-variant'
              }`}
            >
              {order.isPaid ? 'Paid in Full' : 'Pending on Delivery'}
            </span>
          </p>
          <div className="pt-2 border-t border-surface-container-high flex justify-between items-baseline">
            <span className="font-bold text-on-surface">Total Amount:</span>
            <span className="text-headline-md font-bold text-primary font-mono">
              ₹{Number(order.totalPrice).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/orders"
          className="h-11 px-6 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          <span>View All My Orders</span>
        </Link>
        <Link
          to="/shop"
          className="h-11 px-7 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold transition-colors shadow-xs flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

