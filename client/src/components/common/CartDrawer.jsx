import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    isDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 499;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-on-background/40 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl border-l border-surface-container-high flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
              <h2 className="text-headline-sm font-semibold text-on-surface">Your Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-bold">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
              aria-label="Close cart drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-surface-container-low px-6 py-3 border-b border-surface-container-high">
            <div className="flex justify-between items-center text-label-sm mb-1.5 font-medium">
              {amountNeeded > 0 ? (
                <span className="text-on-surface-variant">
                  Add <strong className="text-primary font-bold">₹{amountNeeded.toFixed(2)}</strong> for Free Express Delivery
                </span>
              ) : (
                <span className="text-tertiary flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  You qualify for Free Express Delivery!
                </span>
              )}
              <span className="text-outline font-mono text-[11px]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  progressPercent >= 100 ? 'bg-tertiary' : 'bg-primary-container'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-outline">
                <span className="material-symbols-outlined text-[48px] text-outline-variant mb-3">
                  shopping_cart_checkout
                </span>
                <p className="font-semibold text-on-surface text-body-lg">Your bag is empty</p>
                <p className="text-body-sm text-outline mt-1 max-w-xs">
                  Discover our flagship collection of audio gear, essentials, and modern apparel.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/shop');
                  }}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold transition-colors shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-lg bg-[#F1F5F9] p-1.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-body-sm font-semibold text-on-surface line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-outline hover:text-error transition-colors p-0.5"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-surface-container-high rounded-lg bg-surface-container-lowest">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2 py-0.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-body-sm font-semibold text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-0.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-body-md text-on-surface">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest space-y-4">
              <div className="space-y-1.5 text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-tertiary">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-surface-container-high">
                  <span className="font-bold text-body-md text-on-surface">Estimated Total</span>
                  <span className="text-headline-md font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/checkout');
                  }}
                  className="w-full h-11 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Checkout Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/cart');
                  }}
                  className="w-full h-10 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md font-semibold transition-colors"
                >
                  View Full Cart Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

