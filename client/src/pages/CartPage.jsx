import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SHOPEASE10') {
      const disc = parseFloat((subtotal * 0.1).toFixed(2));
      setPromoDiscount(disc);
      setPromoMessage({ type: 'success', text: '10% Academic Launch Discount Applied!' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "SHOPEASE10"' });
    }
  };

  const finalTotal = Math.max(0, parseFloat((total - promoDiscount).toFixed(2)));

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-4">
          <span className="material-symbols-outlined text-[40px]">shopping_bag</span>
        </div>
        <h2 className="text-headline-lg font-bold text-on-surface">Your Shopping Bag is Empty</h2>
        <p className="text-body-md text-outline mt-2 max-w-md">
          Explore our minimalist studio gear, acoustic flagships, and everyday modern apparel.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-7 py-3 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold transition-all shadow-sm"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-surface-container-high pb-4">
        <h1 className="text-headline-lg font-bold text-on-surface">Shopping Bag ({itemCount})</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Review your selected items and configure delivery options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl bg-surface-container-lowest border border-surface-container-high overflow-hidden shadow-xs">
            <div className="p-4 bg-surface-container-low font-label-sm uppercase tracking-wider text-outline font-bold grid grid-cols-12 gap-4">
              <span className="col-span-6">Product Item</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>

            <div className="divide-y divide-surface-container-high">
              {items.map((item) => (
                <div key={item._id} className="p-4 grid grid-cols-12 gap-4 items-center">
                  {/* Thumbnail & Title */}
                  <div className="col-span-6 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-lg bg-[#F1F5F9] p-1.5 shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-on-surface text-body-sm line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-label-sm text-error hover:underline mt-1 flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center font-medium text-body-sm text-on-surface">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-surface-container-high rounded-lg bg-surface-container-lowest">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-2 py-0.5 text-on-surface-variant hover:text-on-surface"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-body-sm font-bold text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-2 py-0.5 text-on-surface-variant hover:text-on-surface"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="col-span-2 text-right font-bold text-body-md text-on-surface">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-2">
            <Link
              to="/shop"
              className="text-primary hover:text-secondary font-label-md font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-label-sm text-outline hover:text-error transition-colors"
            >
              Empty Entire Bag
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-6">
          <h3 className="text-headline-sm font-semibold text-on-surface">Order Summary</h3>

          <div className="space-y-3 text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Items Subtotal</span>
              <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-on-surface-variant">
              <span>Estimated Shipping</span>
              <span>
                {shipping === 0 ? (
                  <strong className="text-tertiary">FREE (Orders &gt; ₹499)</strong>
                ) : (
                  `₹${shipping.toLocaleString('en-IN')}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-on-surface-variant">
              <span>Estimated Tax (5%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-tertiary font-semibold">
                <span>Promo Discount (10%)</span>
                <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-3 border-t border-surface-container-high flex justify-between items-baseline">
              <span className="font-bold text-body-md text-on-surface">Final Total</span>
              <span className="text-headline-md font-bold text-primary font-mono">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Promo Code Input */}
          <form onSubmit={applyPromo} className="space-y-2">
            <label className="text-label-sm font-semibold text-on-surface block">
              Promotional Coupon
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. SHOPEASE10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 h-9 px-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface uppercase focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-[11px] ${
                  promoMessage.type === 'success' ? 'text-tertiary' : 'text-error'
                }`}
              >
                {promoMessage.text}
              </p>
            )}
          </form>

          {/* Checkout CTA */}
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full h-12 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>Proceed to Checkout</span>
          </button>

          <p className="text-[11px] text-center text-outline">
            Encrypted with 256-bit SSL certificate. Guaranteed safe checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

