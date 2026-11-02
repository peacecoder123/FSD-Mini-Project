import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../utils/api';
import ProductCard from '../components/common/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/products?featured=true&limit=8');
        if (res.data && res.data.products) {
          setFeaturedProducts(res.data.products);
        }
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    {
      name: 'Electronics & Audio',
      slug: 'Electronics',
      count: '84 Items',
      icon: 'headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Modern Apparel',
      slug: 'Fashion',
      count: '62 Items',
      icon: 'checkroom',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Home & Kitchen',
      slug: 'Home & Kitchen',
      count: '48 Items',
      icon: 'coffee_maker',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Books & Science',
      slug: 'Books',
      count: '35 Items',
      icon: 'menu_book',
      image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Clean Beauty',
      slug: 'Beauty',
      count: '29 Items',
      icon: 'spa',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Active Sports',
      slug: 'Sports',
      count: '41 Items',
      icon: 'fitness_center',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION (Faithful to shopease_homepage/code.html) */}
      <section className="relative overflow-hidden bg-surface-container-lowest border-b border-surface-container-high">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-container text-white text-label-sm font-semibold uppercase tracking-wider shadow-xs">
                  Acoustic Flagship Release
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-label-sm font-semibold border border-surface-container-high">
                  Spatial Audio v3
                </span>
              </div>

              <h1 className="text-display-hero-mobile lg:text-display-hero font-bold tracking-tight text-on-surface leading-tight">
                Engineering <span className="text-primary">Precision.</span> Designed for Everyday Focus.
              </h1>

              <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Discover the new standard in acoustic clarity and tactile minimalism. From studio-grade wireless noise cancellation to architectural workspace accessories.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="h-12 px-7 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center gap-2 active:scale-[0.98] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  <span>Explore the Collection</span>
                </Link>
                <Link
                  to="/shop?category=Electronics"
                  className="h-12 px-7 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-lg font-semibold border border-surface-container-high flex items-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>View Flagship Audio</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              {/* Feature Chips Strip */}
              <div className="pt-6 border-t border-surface-container-high grid grid-cols-3 gap-4 text-on-surface-variant">
                <div>
                  <p className="text-headline-md font-bold text-on-surface font-mono">60 Hrs</p>
                  <p className="text-label-sm text-outline">Battery Runtime</p>
                </div>
                <div>
                  <p className="text-headline-md font-bold text-on-surface font-mono">0.02%</p>
                  <p className="text-label-sm text-outline">Total Harmonic Dist.</p>
                </div>
                <div>
                  <p className="text-headline-md font-bold text-on-surface font-mono">2-Year</p>
                  <p className="text-label-sm text-outline">Factory Warranty</p>
                </div>
              </div>
            </div>

            {/* Right Media Hero Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full rounded-2xl bg-surface-container-low border border-surface-container-high overflow-hidden shadow-lg p-8 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/10 via-transparent to-transparent"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs3QRNyLA057MT63FXflvWORKbV4ceMRr_CKTEYCmmt2O4-xoLnXIWsqAmn-1tXLKDABfzOzXtTEdafNa-WPpDARq-kJcYzVyi8c-Vk3nv_1uSxuZy63auDRoo5GdgH-HG9CQs2pzUydc1Tq7G8pZ-O1DH3_8ICDxmYPrtuqqpDYtYPHNf7xaopfZDH99fhN548rTlqFCK9iuHrXmlxWXr60NbVYIKoU_0OYaOwOQ"
                  alt="Aura Pro Wireless ANC Studio Headphones"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 z-10"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high shadow-md flex items-center justify-between z-20">
                  <div>
                    <span className="text-label-sm uppercase tracking-wider text-outline">Featured Flagship</span>
                    <h4 className="font-semibold text-on-surface text-body-md">Aura Pro Wireless ANC</h4>
                    <p className="text-headline-sm font-bold text-primary">₹26,999</p>
                  </div>
                  <Link
                    to="/shop"
                    className="p-2.5 rounded-lg bg-primary hover:bg-secondary text-white shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS STRIP */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface text-body-md">Free Express Delivery</h4>
              <p className="text-body-sm text-outline">On all orders exceeding ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface text-body-md">Official 2-Year Warranty</h4>
              <p className="text-body-sm text-outline">Comprehensive hardware coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">published_with_changes</span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface text-body-md">30-Day Hassle-Free Returns</h4>
              <p className="text-body-sm text-outline">Direct pickup & instant refund</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">headset_mic</span>
            </div>
            <div>
              <h4 className="font-semibold text-on-surface text-body-md">24/7 Priority Concierge</h4>
              <p className="text-body-sm text-outline">Live human technical support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-3 border-b border-surface-container-high gap-4">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface tracking-tight">
              Curated Collections
            </h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Select an architectural discipline to explore curated gear and refined lifestyle essentials.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-primary hover:text-secondary font-label-lg font-semibold flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high hover:border-primary/40 hover:shadow-md transition-all flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-low group-hover:bg-primary-fixed flex items-center justify-center text-primary transition-colors">
                <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-body-sm group-hover:text-primary transition-colors line-clamp-1">
                  {cat.name}
                </h4>
                <p className="text-label-sm text-outline mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (REAL BACKEND INTEGRATION) */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-3 border-b border-surface-container-high gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="text-label-sm uppercase tracking-wider text-primary font-bold">
                Editorial Picks
              </span>
            </div>
            <h2 className="text-headline-lg font-bold text-on-surface tracking-tight">
              Flagship Showcase
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-primary hover:text-secondary font-label-lg font-semibold flex items-center gap-1 shrink-0"
          >
            <span>Browse Full Catalog</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 animate-pulse space-y-4"
              >
                <div className="aspect-square bg-surface-container-low rounded-lg"></div>
                <div className="h-4 bg-surface-container-low rounded w-1/3"></div>
                <div className="h-6 bg-surface-container-low rounded w-3/4"></div>
                <div className="h-8 bg-surface-container-low rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. FLASH SALE PROMOTION BANNER */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="relative rounded-2xl bg-gradient-to-r from-inverse-surface via-[#1b253b] to-inverse-surface text-white p-8 md:p-12 overflow-hidden shadow-xl border border-surface-container-high/30">
          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error text-white font-label-sm font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Limited Spring Clearance
            </div>

            <h3 className="text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight">
              Enjoy Up to 40% Off Premium ANC Studio Headphones & Gear
            </h3>

            <p className="text-inverse-on-surface/80 text-body-md">
              High-resolution acoustic engineering meets unmatched battery stamina. Stock is allocated on a strictly first-come basis.
            </p>

            {/* Live Countdown Box */}
            <div className="flex items-center gap-3 font-mono">
              <div className="p-3 bg-white/10 rounded-lg text-center min-w-[64px] backdrop-blur-sm border border-white/10">
                <span className="text-headline-md font-bold block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-white/70">Hours</span>
              </div>
              <span className="text-headline-md font-bold text-white/50">:</span>
              <div className="p-3 bg-white/10 rounded-lg text-center min-w-[64px] backdrop-blur-sm border border-white/10">
                <span className="text-headline-md font-bold block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-white/70">Minutes</span>
              </div>
              <span className="text-headline-md font-bold text-white/50">:</span>
              <div className="p-3 bg-white/10 rounded-lg text-center min-w-[64px] backdrop-blur-sm border border-white/10">
                <span className="text-headline-md font-bold block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-white/70">Seconds</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/shop?deal=true"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-on-surface font-label-lg font-bold hover:bg-surface-container-low active:scale-[0.98] transition-all shadow-md"
              >
                <span>Shop the Flash Event</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

