import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiFetch from '../utils/api';

const CheckoutPage = () => {
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'card_simulated'
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
        <h2 className="text-headline-md font-bold text-on-surface">Your Cart is Empty</h2>
        <p className="text-outline mt-2">Add items to your bag before checking out.</p>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2.5 bg-primary text-white rounded-lg font-semibold">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(null);

    if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.phone) {
      setError('Please provide all required shipping details.');
      return;
    }

    if (!isAuthenticated) {
      alert('Please sign in or register to place your order.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        orderItems: items.map((i) => ({
          product: i.product?._id || i.product,
          title: i.title,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        shippingAddress,
        paymentMethod,
        paymentResult: paymentMethod === 'card_simulated' ? {
          id: `SIM-TXN-${Date.now()}`,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          cardLast4: cardNumber.replace(/\s+/g, '').slice(-4),
        } : undefined,
      };

      const res = await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.data) {
        clearCart();
        navigate(`/order-confirmation/${res.data._id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-surface-container-high pb-4">
        <h1 className="text-headline-lg font-bold text-on-surface">Secure Checkout</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Complete your delivery address and choose your payment instrument.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-error-container/40 border border-error text-error text-body-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Shipping Address */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
            <h3 className="text-headline-sm font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">location_on</span>
              1. Delivery Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleChange}
                  placeholder="42, Indiranagar 100ft Road"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  placeholder="Bengaluru"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  State / Province *
                </label>
                <input
                  type="text"
                  required
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  placeholder="Karnataka"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                  placeholder="560038"
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-label-sm font-semibold text-on-surface block mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
            <h3 className="text-headline-sm font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
              2. Payment Instrument
            </h3>

            {/* Radio 1: Cash On Delivery */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'cod'
                  ? 'border-primary bg-surface-container-low'
                  : 'border-surface-container-high hover:bg-surface-container-low/50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface text-body-md">Cash on Delivery (COD)</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container text-on-surface-variant">
                    Zero Pre-payment
                  </span>
                </div>
                <p className="text-body-sm text-outline mt-0.5">
                  Inspect items upon courier delivery and pay in cash or via handheld POS terminal.
                </p>
              </div>
            </label>

            {/* Radio 2: Simulated Online Payment */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'card_simulated'
                  ? 'border-primary bg-surface-container-low'
                  : 'border-surface-container-high hover:bg-surface-container-low/50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card_simulated"
                checked={paymentMethod === 'card_simulated'}
                onChange={() => setPaymentMethod('card_simulated')}
                className="mt-1 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface text-body-md">
                    Simulated Credit / Debit Card Gateway
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-tertiary-container/20 text-tertiary">
                    Instant Simulation
                  </span>
                </div>
                <p className="text-body-sm text-outline mt-0.5">
                  Demo credit card testing sandbox. Pre-filled with verified test credentials.
                </p>

                {paymentMethod === 'card_simulated' && (
                  <div className="mt-4 p-4 rounded-lg bg-surface-container-lowest border border-surface-container-high space-y-3">
                    <div>
                      <label className="text-label-sm font-semibold text-on-surface block mb-1">
                        Card Number (Pre-filled Test Sandbox)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-9 px-3 font-mono text-body-sm rounded border border-surface-container-high bg-surface-container-low text-on-surface"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-label-sm font-semibold text-on-surface block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full h-9 px-3 font-mono text-body-sm rounded border border-surface-container-high bg-surface-container-low text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="text-label-sm font-semibold text-on-surface block mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full h-9 px-3 font-mono text-body-sm rounded border border-surface-container-high bg-surface-container-low text-on-surface"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Order Summary & Review (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6 sticky top-24">
          <h3 className="text-headline-sm font-semibold text-on-surface">Order Confirmation</h3>

          {/* Items Mini List */}
          <div className="divide-y divide-surface-container-high max-h-60 overflow-y-auto custom-scrollbar">
            {items.map((item) => (
              <div key={item._id} className="py-2.5 flex items-center justify-between gap-3 text-body-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain rounded bg-[#F1F5F9] p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface line-clamp-1">{item.title}</p>
                    <p className="text-outline text-label-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-on-surface shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-surface-container-high space-y-2.5 text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Items Subtotal</span>
              <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? <strong className="text-tertiary">FREE</strong> : `₹${shipping.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Estimated Tax (5%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-3 border-t border-surface-container-high flex justify-between items-baseline">
              <span className="font-bold text-body-md text-on-surface">Total Payable</span>
              <span className="text-headline-md font-bold text-primary font-mono">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Submit Order CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">
              {loading ? 'hourglass_top' : 'check_circle'}
            </span>
            <span>{loading ? 'Processing Order...' : `Confirm & Place Order (₹${total.toLocaleString('en-IN')})`}</span>
          </button>

          {!isAuthenticated && (
            <p className="text-[12px] text-center text-error font-medium">
              Note: You will be prompted to sign in to confirm this order.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

