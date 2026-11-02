import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount, openCartDrawer } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="docked full-width top-0 sticky z-50 bg-surface-container-lowest shadow-xs border-b border-surface-container-high">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-3 max-w-[1440px] mx-auto gap-4 lg:gap-6">
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 active:scale-[0.98] transition-transform duration-150"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold tracking-tight text-on-surface leading-tight">
                Shop<span className="text-primary-container">Ease</span>
              </span>
              <span className="text-[9px] font-semibold tracking-wider uppercase text-outline leading-none">
                Modern Commerce
              </span>
            </div>
          </Link>

          {/* Navigation Links for Desktop */}
          <nav className="hidden xl:flex items-center gap-6 font-label-lg text-label-lg ml-2">
            <Link
              to="/"
              className={`pb-1 transition-colors ${
                isActive('/')
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`pb-1 transition-colors ${
                isActive('/shop')
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/shop?category=Electronics"
              className="text-on-surface-variant hover:text-on-surface font-medium transition-colors pb-1"
            >
              Electronics
            </Link>
            <Link
              to="/shop?category=Fashion"
              className="text-on-surface-variant hover:text-on-surface font-medium transition-colors pb-1"
            >
              Fashion
            </Link>
            <Link
              to="/shop?deal=true"
              className="text-on-surface-variant hover:text-on-surface font-medium transition-colors pb-1 flex items-center gap-1.5"
            >
              <span>Deals</span>
              <span className="px-1.5 py-0.5 rounded-full bg-error-container text-error text-[10px] font-bold leading-none">
                HOT
              </span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className={`pb-1 transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/admin')
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-primary-container hover:text-secondary font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                <span>Admin Console</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Unified Search Input */}
        <div className="flex-1 max-w-xl mx-1 sm:mx-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center" role="search">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear, headphones, apparel, books..."
              className="w-full h-10 sm:h-11 pl-10 pr-16 sm:pr-24 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm sm:text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant tracking-wider font-mono">
                ⌘K
              </span>
            </div>
          </form>
        </div>

        {/* Trailing Action Icons */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Wishlist Link */}
          <Link
            to="/shop"
            className="relative p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-150 active:scale-[0.98]"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-[24px]">favorite</span>
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-container text-on-primary font-label-sm text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openCartDrawer}
            className="relative p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-150 active:scale-[0.98]"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error font-label-sm text-[10px] flex items-center justify-center font-bold animate-fadeIn">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account Menu */}
          <div className="relative pl-1 sm:pl-2 border-l border-surface-container-high">
            {isAuthenticated ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg hover:bg-surface-container-low transition-colors duration-150 active:scale-[0.98]"
                >
                  <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-label-md font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-label-sm text-label-sm text-outline leading-none">
                      Hi, {user?.name?.split(' ')[0]}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                      My Account
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-surface-container-high">
                      <p className="font-semibold text-on-surface text-body-sm">{user?.name}</p>
                      <p className="text-outline text-label-sm truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-fixed text-on-primary-fixed">
                        {user?.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        person
                      </span>
                      <span>Profile & Settings</span>
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        receipt_long
                      </span>
                      <span>My Orders</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-primary font-semibold hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          admin_panel_settings
                        </span>
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-surface-container-high mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-body-sm text-error hover:bg-error-container/20 transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-label-md font-semibold text-primary hover:bg-surface-container-low transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-primary text-white text-label-md font-semibold hover:bg-secondary active:scale-[0.98] transition-all shadow-xs"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container-high px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md font-semibold text-on-surface hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md font-semibold text-on-surface hover:text-primary"
          >
            Browse All Products
          </Link>
          <Link
            to="/shop?category=Electronics"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md text-on-surface-variant hover:text-primary"
          >
            Electronics & Sound
          </Link>
          <Link
            to="/shop?category=Fashion"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md text-on-surface-variant hover:text-primary"
          >
            Fashion & Apparel
          </Link>
          <Link
            to="/shop?category=Home & Kitchen"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md text-on-surface-variant hover:text-primary"
          >
            Home & Living
          </Link>
          <Link
            to="/shop?deal=true"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-body-md font-bold text-error flex items-center justify-between"
          >
            <span>Spring Flash Deals</span>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-error text-[10px]">
              UP TO 50%
            </span>
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-body-md font-bold text-primary flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              <span>Admin Console</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

