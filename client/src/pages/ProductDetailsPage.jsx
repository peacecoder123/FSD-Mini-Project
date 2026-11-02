import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiFetch from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [isAdding, setIsAdding] = useState(false);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/products/${id}`);
        if (res.data) {
          setProduct(res.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleBuyNow = async () => {
    if (!product) return;
    await addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to submit a review');
      navigate('/login');
      return;
    }
    if (!reviewComment.trim()) return;

    try {
      setSubmittingReview(true);
      const res = await apiFetch(`/products/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          rating: Number(reviewRating),
          comment: reviewComment,
        }),
      });
      setReviewMessage({ type: 'success', text: 'Thank you! Your verified review has been posted.' });
      setReviewComment('');
      // Reload product to refresh reviews and average rating
      const updated = await apiFetch(`/products/${id}`);
      setProduct(updated.data);
    } catch (err) {
      setReviewMessage({ type: 'error', text: err.message });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-16 text-center">
        <h2 className="text-headline-md font-bold text-on-surface">Product Not Found</h2>
        <p className="text-outline mt-2">{error || 'The requested product could not be found.'}</p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-6 py-2.5 bg-primary text-white font-semibold rounded-lg"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.png'];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link to="/shop" className="hover:text-primary transition-colors">
          Catalog
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-on-surface font-semibold truncate max-w-[240px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* 2. Main Two-Column Split (Faithful to shopease_product_details/code.html) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================== LEFT COLUMN: Product Gallery (7 Cols) ==================== */}
        <section className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sticky top-24">
          {/* Thumbnail Rail (Vertical on md+) */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg p-1 bg-surface-container-lowest overflow-hidden flex items-center justify-center transition-all ${
                  selectedImage === idx
                    ? 'border-2 border-primary shadow-sm'
                    : 'border border-outline-variant hover:border-primary/50'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain rounded" />
              </button>
            ))}
          </div>

          {/* Main Hero Image Viewport */}
          <div className="relative flex-1 bg-surface-container-lowest rounded-xl border border-surface-container-high overflow-hidden group shadow-xs flex items-center justify-center min-h-[420px] md:min-h-[520px]">
            {/* Badges overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container text-white font-label-md text-label-md rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Flagship Edition
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-error text-white font-label-md text-label-md rounded-full shadow-sm">
                  Save {product.discountPercent || 20}%
                </span>
              )}
            </div>

            {/* 360 & Zoom Badges */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md rounded-full border border-surface-container-high shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">360</span>
                <span>360° Studio View</span>
              </span>
            </div>

            {/* Main Product Image */}
            <img
              src={images[selectedImage] || images[0]}
              alt={product.title}
              className="w-full h-full max-h-[500px] object-contain p-8 transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </section>

        {/* ==================== RIGHT COLUMN: Purchase Details & Buy Box (5 Cols) ==================== */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Header & Identity Section */}
          <div className="border-b border-surface-container-high pb-5">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-outline">
                {product.brand} | SKU: {product.sku}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md font-semibold ${
                  product.stockCount > 0
                    ? 'bg-tertiary-container/10 text-tertiary'
                    : 'bg-error-container text-error'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.stockCount > 0 ? 'bg-tertiary' : 'bg-error'
                  }`}
                ></span>
                {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
              {product.title}
            </h1>

            {/* Rating Cluster */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined text-[18px] ${
                      i < Math.floor(product.rating || 5) ? 'fill-1' : ''
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-bold text-on-surface text-body-sm">{product.rating || 4.8}</span>
              <span className="text-outline text-body-sm">•</span>
              <span className="text-outline text-body-sm underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                {product.reviews?.length || product.numReviews || 0} Verified Reviews
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-display-hero-mobile font-bold text-on-surface tracking-tight">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-body-lg text-outline line-through">
                    ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-error-container text-error font-label-sm font-bold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description & Features */}
          <div className="text-body-md text-on-surface-variant leading-relaxed">
            <p>{product.description}</p>
            {product.features && product.features.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quantity Stepper & CTAs */}
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-semibold text-on-surface">Quantity:</span>
              <div className="flex items-center border border-surface-container-high rounded-lg bg-surface-container-lowest">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  -
                </button>
                <span className="px-4 font-mono font-bold text-on-surface">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                  className="px-3 py-1 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={product.stockCount <= 0 || isAdding}
                onClick={handleAddToCart}
                className="h-12 rounded-lg bg-primary hover:bg-secondary text-white font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isAdding ? 'check' : 'add_shopping_cart'}
                </span>
                <span>{isAdding ? 'Added to Bag' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                disabled={product.stockCount <= 0}
                onClick={handleBuyNow}
                className="h-12 rounded-lg bg-on-surface text-surface hover:bg-inverse-surface font-label-lg font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-surface-container-high text-center font-label-sm text-label-sm text-on-surface-variant">
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
              <span>Free Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-surface-container-high">
              <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
              <span>2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-primary">undo</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Tabbed Specifications & Customer Reviews Section */}
      <section className="pt-8 border-t border-surface-container-high">
        {/* Tabs Bar */}
        <div className="flex items-center gap-8 border-b border-surface-container-high font-label-lg text-label-lg">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Product Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'specs'
                ? 'text-primary border-b-2 border-primary'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'text-primary border-b-2 border-primary'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span>Verified Reviews</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold text-[11px]">
              {product.reviews?.length || 0}
            </span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="py-6 max-w-3xl space-y-4 text-body-md text-on-surface-variant leading-relaxed">
            <h3 className="text-headline-md font-bold text-on-surface">
              Architectural Design & Precision Engineering
            </h3>
            <p>{product.description}</p>
            <p>
              Each unit is assembled in accordance with exacting studio benchmarks. Every structural component—from the custom acoustic enclosure to the balanced pivot architecture—has been optimized for pure ergonomic comfort and durable everyday focus.
            </p>
          </div>
        )}

        {/* Tab 2: Technical Specifications */}
        {activeTab === 'specs' && (
          <div className="py-6 max-w-2xl">
            <table className="w-full text-body-sm text-left border border-surface-container-high rounded-xl overflow-hidden">
              <tbody>
                <tr className="border-b border-surface-container-high bg-surface-container-low/50">
                  <td className="p-3 font-semibold text-on-surface w-1/3">Brand</td>
                  <td className="p-3 text-on-surface-variant">{product.brand}</td>
                </tr>
                <tr className="border-b border-surface-container-high">
                  <td className="p-3 font-semibold text-on-surface">Category</td>
                  <td className="p-3 text-on-surface-variant">{product.category}</td>
                </tr>
                <tr className="border-b border-surface-container-high bg-surface-container-low/50">
                  <td className="p-3 font-semibold text-on-surface">SKU Identifier</td>
                  <td className="p-3 font-mono text-on-surface-variant">{product.sku}</td>
                </tr>
                <tr className="border-b border-surface-container-high">
                  <td className="p-3 font-semibold text-on-surface">Warranty Period</td>
                  <td className="p-3 text-on-surface-variant">24 Months Limited Manufacturer</td>
                </tr>
                <tr className="bg-surface-container-low/50">
                  <td className="p-3 font-semibold text-on-surface">Available Stock Units</td>
                  <td className="p-3 text-on-surface-variant">{product.stockCount} units ready for dispatch</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-headline-sm font-bold text-on-surface">
                Customer Feedback ({product.reviews?.length || 0})
              </h3>

              {(!product.reviews || product.reviews.length === 0) ? (
                <p className="text-outline text-body-sm py-4">
                  No customer reviews yet. Be the first to share your experience with this item!
                </p>
              ) : (
                product.reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-[12px]">
                          {rev.userName?.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-semibold text-on-surface text-body-sm">{rev.userName}</span>
                        <span className="text-[10px] bg-tertiary-container/10 text-tertiary px-1.5 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-outline text-[11px]">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-[16px] ${
                            i < rev.rating ? 'fill-1' : ''
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>

                    <p className="text-body-sm text-on-surface-variant">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Submit Review Box */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
              <h4 className="text-headline-sm font-semibold text-on-surface">Write a Review</h4>
              <p className="text-outline text-body-sm mt-1">
                Share your impressions to assist other verified shoppers.
              </p>

              {reviewMessage && (
                <div
                  className={`mt-4 p-3 rounded-lg text-body-sm ${
                    reviewMessage.type === 'success'
                      ? 'bg-tertiary-container/20 text-tertiary border border-tertiary'
                      : 'bg-error-container/30 text-error border border-error'
                  }`}
                >
                  {reviewMessage.text}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-label-sm font-semibold text-on-surface mb-1">
                    Rating (1 to 5 Stars):
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-amber-500 hover:scale-110 transition-transform p-0.5"
                      >
                        <span
                          className={`material-symbols-outlined text-[24px] ${
                            star <= reviewRating ? 'fill-1' : ''
                          }`}
                        >
                          star
                        </span>
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-on-surface text-body-sm">
                      {reviewRating} of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-label-sm font-semibold text-on-surface mb-1">
                    Your Review Feedback:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe product build quality, acoustic balance, comfort, and performance..."
                    className="w-full p-3 text-body-sm rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full h-10 rounded-lg bg-primary hover:bg-secondary text-white font-label-md font-semibold transition-colors active:scale-[0.98] shadow-xs"
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetailsPage;
