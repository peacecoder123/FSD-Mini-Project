import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    await addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <article className="group bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative">
      <div>
        {/* Media Viewport */}
        <div className="relative w-full aspect-square bg-[#F1F5F9] rounded-lg overflow-hidden mb-3.5 flex items-center justify-center p-4">
          {/* Badges */}
          {product.isBestSeller && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-label-sm font-label-sm rounded-full bg-primary text-on-primary font-semibold shadow-xs">
              Best Seller
            </span>
          )}
          {!product.isBestSeller && hasDiscount && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-label-sm font-label-sm rounded-full bg-error text-on-error font-semibold shadow-xs">
              -{product.discountPercent || 20}% OFF
            </span>
          )}
          {!product.isBestSeller && !hasDiscount && product.isFeatured && (
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-label-sm font-label-sm rounded-full bg-surface-container-high text-primary font-semibold shadow-xs border border-surface-variant">
              Featured
            </span>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
            className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur hover:bg-surface-container-lowest text-on-surface-variant hover:text-error transition-colors shadow-xs active:scale-90"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-colors ${
                isWishlisted ? 'text-error fill-1' : ''
              }`}
            >
              favorite
            </span>
          </button>

          {/* Product Image */}
          <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Product Metadata */}
        <div className="flex flex-col">
          <span className="text-label-sm font-label-sm uppercase tracking-wider text-outline font-semibold">
            {product.brand || product.category}
          </span>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-headline-sm font-headline-sm text-on-surface line-clamp-2 mt-0.5 group-hover:text-primary transition-colors min-h-[44px]">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-500 text-[14px]">
              <span className="material-symbols-outlined fill-1 text-[16px]">star</span>
            </div>
            <span className="text-label-md font-label-md text-on-surface font-bold">
              {product.rating || 4.8}
            </span>
            <span className="text-body-sm font-body-sm text-outline">
              ({product.numReviews || 0})
            </span>
          </div>

          {/* Price Architecture */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-headline-md font-headline-md text-on-surface font-bold">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className="text-body-sm font-body-sm text-outline line-through">
                ₹{Number(product.originalPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`w-2 h-2 rounded-full ${
                product.stockCount > 0 ? 'bg-tertiary' : 'bg-error'
              }`}
            ></span>
            <span
              className={`text-label-sm font-label-sm font-medium ${
                product.stockCount > 0 ? 'text-tertiary' : 'text-error'
              }`}
            >
              {product.stockCount > 0
                ? product.stockCount <= 5
                  ? `Low Stock (${product.stockCount} left)`
                  : 'In Stock'
                : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <button
        type="button"
        disabled={product.stockCount <= 0 || isAdding}
        onClick={handleAddToCart}
        className={`mt-4 w-full h-10 rounded-lg text-label-md font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xs ${
          product.stockCount <= 0
            ? 'bg-surface-container-high text-outline cursor-not-allowed'
            : 'bg-primary hover:bg-secondary text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {isAdding ? 'check' : 'add_shopping_cart'}
        </span>
        {isAdding ? 'Added to Bag' : product.stockCount <= 0 ? 'Sold Out' : 'Add to Cart'}
      </button>
    </article>
  );
};

export default ProductCard;

