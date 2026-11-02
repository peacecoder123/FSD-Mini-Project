import React from 'react';
import { Link } from 'react-router-dom';

const SecondaryCategoryBar = () => {
  return (
    <div className="bg-surface-container-lowest border-t border-surface-container-high/60 hidden md:block">
      <div className="max-w-[1440px] mx-auto px-6 py-2 flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-on-surface font-semibold shrink-0 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">menu</span>
            Browse All
          </Link>
          <Link
            to="/shop?category=Electronics"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Audio & Electronics
          </Link>
          <Link
            to="/shop?category=Fashion"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Fashion & Apparel
          </Link>
          <Link
            to="/shop?category=Home & Kitchen"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Home & Kitchen
          </Link>
          <Link
            to="/shop?category=Books"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Books & Design
          </Link>
          <Link
            to="/shop?category=Beauty"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Beauty & Skincare
          </Link>
          <Link
            to="/shop?category=Sports"
            className="hover:text-primary shrink-0 transition-colors"
          >
            Sports & Fitness
          </Link>
          <Link
            to="/shop?deal=true"
            className="hover:text-error text-error/90 font-semibold shrink-0 transition-colors flex items-center gap-1"
          >
            <span>Spring Clearance</span>
            <span className="text-[10px] bg-error-container text-error px-1.5 py-0.2 rounded-full font-bold">
              50% OFF
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-5 shrink-0 text-outline text-label-sm">
          <Link
            to="/orders"
            className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Order Status</span>
          </Link>
          <a
            href="mailto:support@shopease.com"
            className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">headset_mic</span>
            <span>24/7 Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCategoryBar;

