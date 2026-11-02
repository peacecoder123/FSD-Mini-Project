import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-high mt-16 text-on-surface-variant font-body-sm text-body-sm">
      {/* Newsletter Strip */}
      <div className="border-b border-surface-container-high py-10 bg-surface-container-low/50">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-headline-sm font-semibold text-on-surface">
              Join the ShopEase Member Registry
            </h4>
            <p className="text-outline mt-1 text-body-sm">
              Receive private product release notifications, editorial reviews, and early access to seasonal archives.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to ShopEase updates!');
            }}
            className="flex w-full md:w-auto max-w-md gap-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 h-11 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold shrink-0 transition-colors active:scale-[0.98] shadow-xs"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
            </div>
            <span className="text-[18px] font-bold text-on-surface">
              Shop<span className="text-primary-container">Ease</span>
            </span>
          </Link>
          <p className="text-outline text-body-sm max-w-sm">
            High-precision full-stack commerce engineered with editorial purity. Minimalist software principles applied to everyday lifestyle and studio essentials.
          </p>
          <div className="flex items-center gap-3 text-outline mt-2">
            <span className="flex items-center gap-1.5 text-label-sm font-medium">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
              256-bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-label-sm font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
              Express Courier
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
            Shop Catalog
          </span>
          <Link to="/shop?category=Electronics" className="hover:text-primary transition-colors">
            Audio & Electronics
          </Link>
          <Link to="/shop?category=Fashion" className="hover:text-primary transition-colors">
            Fashion & Apparel
          </Link>
          <Link to="/shop?category=Home & Kitchen" className="hover:text-primary transition-colors">
            Home & Living
          </Link>
          <Link to="/shop?category=Books" className="hover:text-primary transition-colors">
            Books & Design
          </Link>
          <Link to="/shop?category=Beauty" className="hover:text-primary transition-colors">
            Beauty & Skincare
          </Link>
          <Link to="/shop?category=Sports" className="hover:text-primary transition-colors">
            Sports & Fitness
          </Link>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
            Assistance
          </span>
          <Link to="/orders" className="hover:text-primary transition-colors">
            Track Your Order
          </Link>
          <Link to="/profile" className="hover:text-primary transition-colors">
            Account Management
          </Link>
          <a href="#shipping" className="hover:text-primary transition-colors">
            Shipping & Delivery
          </a>
          <a href="#returns" className="hover:text-primary transition-colors">
            Returns & Exchanges
          </a>
          <a href="#concierge" className="hover:text-primary transition-colors">
            Concierge Desk
          </a>
        </div>

        {/* Legal & Academic Info */}
        <div className="flex flex-col gap-2.5">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
            Academic Viva
          </span>
          <span className="text-on-surface font-medium">ShopEase Mini Project</span>
          <span className="text-outline text-label-sm">Full-Stack Development (FSD)</span>
          <span className="text-outline text-label-sm">MERN Architecture</span>
          <span className="text-outline text-label-sm">REST API & MongoDB</span>
          <span className="text-outline text-label-sm">JWT Auth & RBAC</span>
        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-surface-container-high py-6 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-label-sm text-label-sm text-outline">
          <p>© 2026 ShopEase E-Commerce Inc. All rights reserved. Academic mini-project reference.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-on-surface transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-on-surface transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-on-surface transition-colors cursor-pointer">Security Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

