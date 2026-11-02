import React from 'react';
import { Link } from 'react-router-dom';

const AnnouncementBanner = () => {
  return (
    <aside aria-label="Announcement banner" className="bg-inverse-surface text-inverse-on-surface py-1.5 px-6 border-b border-surface-container-high/20">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-md text-label-md">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-tertiary-fixed-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
            Spring Flash Event Live
          </span>
          <span className="text-outline-variant hidden sm:inline">|</span>
          <span className="hidden sm:inline text-inverse-on-surface/90">
            Free Express Delivery on orders over ₹499
          </span>
        </div>
        <div className="flex items-center gap-6 text-inverse-on-surface/80">
          <Link to="/orders" className="hover:text-inverse-on-surface transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Track Order</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-inverse-on-surface">
              <span>INR (₹)</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-inverse-on-surface">
              <span>English</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBanner;

