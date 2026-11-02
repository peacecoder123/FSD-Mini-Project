import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialDeal = searchParams.get('deal') === 'true';

  const [colsDensity, setColsDensity] = useState(4); // 3 or 4 columns on large screens
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const {
    products,
    pagination,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
    inStockOnly,
    setInStockOnly,
    page,
    setPage,
    resetFilters,
  } = useProducts({
    category: initialCategory,
    search: initialSearch,
  });

  // Keep search params in sync
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== category) setCategory(cat);
    const s = searchParams.get('search');
    if (s && s !== search) setSearch(s);
  }, [searchParams]);

  const categories = [
    { name: 'All Categories', value: 'All', count: 24 },
    { name: 'Electronics & Audio', value: 'Electronics', count: 4 },
    { name: 'Fashion & Apparel', value: 'Fashion', count: 4 },
    { name: 'Home & Kitchen', value: 'Home & Kitchen', count: 4 },
    { name: 'Books & Science', value: 'Books', count: 4 },
    { name: 'Beauty & Skincare', value: 'Beauty', count: 4 },
    { name: 'Sports & Active', value: 'Sports', count: 4 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-body-sm font-body-sm text-outline">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="text-on-surface font-medium">
          {category === 'All' ? 'Catalog Showcase' : category}
        </span>
        {search && (
          <>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-medium">"{search}"</span>
          </>
        )}
      </nav>

      {/* 2. Page Title & Results Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-surface-container-high">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
            {category === 'All' ? 'All Products & Gear' : `${category} Collection`}
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1 max-w-2xl">
            Engineered acoustic clarity, minimalist lifestyle gear, and studio-grade craftsmanship.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-surface-container-high bg-surface-container-lowest text-on-surface font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Filters</span>
          </button>

          <div className="text-label-md font-label-md text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-surface-container-high">
            Showing <span className="font-bold text-on-surface">{products.length}</span> of{' '}
            <span className="font-bold text-on-surface">{pagination.total}</span> results
          </div>
        </div>
      </div>

      {/* 3. Top Control Bar (Sort & Column Density) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-xs">
        <div className="flex items-center gap-2 text-body-sm text-outline">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          <span>Active filter: <strong className="text-on-surface font-semibold">{category}</strong></span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort By Select */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-label-md font-label-md text-on-surface-variant whitespace-nowrap">
              Sort By:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 pl-3 pr-8 py-1 text-label-md font-label-md bg-surface-container-lowest border border-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-surface-container-high hidden sm:block"></div>

          {/* Density Toggle (3 vs 4 columns) */}
          <div className="hidden sm:flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-surface-container-high">
            <button
              type="button"
              onClick={() => setColsDensity(3)}
              className={`p-1 rounded transition-colors ${
                colsDensity === 3
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
              title="3 Columns"
            >
              <span className="material-symbols-outlined text-[20px] block">view_agenda</span>
            </button>
            <button
              type="button"
              onClick={() => setColsDensity(4)}
              className={`p-1 rounded transition-colors ${
                colsDensity === 4
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
              title="4 Columns"
            >
              <span className="material-symbols-outlined text-[20px] block">grid_view</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Layout Grid (Left Sidebar + Right Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================== LEFT SIDEBAR (Sticky Filters) ==================== */}
        <aside
          className={`lg:col-span-3 sticky top-20 flex flex-col gap-6 p-5 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-xs ${
            mobileFilterOpen ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
            <span className="text-headline-sm font-headline-sm text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              Filters
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="text-label-sm font-label-sm text-primary hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* 1. Category Tree */}
          <div className="flex flex-col gap-2.5">
            <span className="text-label-md font-label-md uppercase tracking-wider text-outline font-bold">
              Category
            </span>
            <ul className="flex flex-col gap-1.5 text-body-sm font-body-sm">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(cat.value);
                      setPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      category === cat.value
                        ? 'bg-surface-container text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-label-sm px-2 py-0.5 rounded-full border border-surface-container-high ${
                        category === cat.value
                          ? 'text-primary bg-surface-container-lowest font-bold'
                          : 'text-outline bg-surface-container-low'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-surface-container-high"></div>

          {/* 2. Price Range Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-label-md font-label-md uppercase tracking-wider text-outline font-bold">
              Price Range (₹)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
                className="w-full h-9 px-3 text-body-sm bg-surface-container-low border border-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-outline">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
                className="w-full h-9 px-3 text-body-sm bg-surface-container-low border border-surface-container-high rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="h-px bg-surface-container-high"></div>

          {/* 3. Availability Toggles */}
          <div className="flex flex-col gap-3">
            <span className="text-label-md font-label-md uppercase tracking-wider text-outline font-bold">
              Availability
            </span>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-on-surface">In Stock Only</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setPage(1);
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
              </label>
            </div>
          </div>
        </aside>

        {/* ==================== RIGHT PRODUCT GRID ==================== */}
        <section className="lg:col-span-9 flex flex-col gap-8">
          {loading ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                colsDensity === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
              } gap-5`}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 animate-pulse space-y-4"
                >
                  <div className="aspect-square bg-surface-container-low rounded-lg"></div>
                  <div className="h-4 bg-surface-container-low rounded w-1/3"></div>
                  <div className="h-5 bg-surface-container-low rounded w-3/4"></div>
                  <div className="h-8 bg-surface-container-low rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 rounded-xl bg-error-container/20 border border-error text-center">
              <p className="text-error font-semibold">Error loading products: {error}</p>
              <button
                onClick={resetFilters}
                className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-body-sm font-semibold"
              >
                Reset Filters & Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 px-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-2">
                search_off
              </span>
              <h3 className="text-headline-sm font-semibold text-on-surface">No products found</h3>
              <p className="text-body-sm text-outline mt-1 max-w-md">
                We couldn't find any items matching your selected criteria. Try adjusting your filters or price bounds.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 px-5 py-2.5 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                colsDensity === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
              } gap-5`}
              id="product-grid"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* 5. Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-surface-container-high">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container-lowest text-on-surface font-label-md text-label-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
              >
                Previous
              </button>

              {[...Array(pagination.pages)].map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`w-9 h-9 rounded-lg font-label-md text-label-md font-semibold transition-colors ${
                      page === pageNumber
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface-container-lowest border border-surface-container-high text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container-lowest text-on-surface font-label-md text-label-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;

