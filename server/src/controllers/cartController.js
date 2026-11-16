import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { mockProducts } from '../data/mockProducts.js';

// In-memory fallback cart cache for demo/serverless environments
const demoCarts = new Map();

const getDemoCart = (userId = 'guest') => {
  if (!demoCarts.has(userId)) {
    demoCarts.set(userId, {
      user: userId,
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    });
  }
  return demoCarts.get(userId);
};

const calculateDemoTotals = (cart) => {
  const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cart.subtotal = parseFloat(subtotal.toFixed(2));
  cart.shipping = cart.subtotal > 499 || cart.items.length === 0 ? 0 : 99;
  cart.tax = parseFloat((cart.subtotal * 0.05).toFixed(2));
  cart.total = parseFloat((cart.subtotal + cart.shipping + cart.tax).toFixed(2));
  return cart;
};

// Helper to ensure cart exists in MongoDB
const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// @desc    Get current user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const userId = req.user?._id?.toString() || 'guest';
      const cart = getDemoCart(userId);
      return res.json({
        success: true,
        data: cart,
      });
    }

    const cart = await findOrCreateCart(req.user._id);
    cart.calculateTotals();
    await cart.save();
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const product = mockProducts.find((p) => p._id === productId || p.sku === productId) || {
        _id: productId,
        title: 'Precision Acoustic Studio Monitor',
        price: 3499,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
        stockCount: 15,
      };

      const userId = req.user?._id?.toString() || 'guest';
      const cart = getDemoCart(userId);

      const existingIndex = cart.items.findIndex(
        (item) => (item.product?._id || item.product).toString() === productId.toString()
      );

      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += Number(quantity);
      } else {
        cart.items.push({
          _id: 'ci_' + Date.now(),
          product: product._id,
          title: product.title,
          image: product.images?.[0] || '',
          price: product.price,
          quantity: Number(quantity),
        });
      }

      calculateDemoTotals(cart);

      return res.status(200).json({
        success: true,
        message: 'Product added to cart',
        data: cart,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stockCount < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stockCount} items available in stock`,
      });
    }

    const cart = await findOrCreateCart(req.user._id);

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + Number(quantity);
      if (newQty > product.stockCount) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more. Total in cart would exceed available stock (${product.stockCount})`,
        });
      }
      cart.items[existingIndex].quantity = newQty;
    } else {
      cart.items.push({
        product: product._id,
        title: product.title,
        image: product.images[0] || '',
        price: product.price,
        quantity: Number(quantity),
      });
    }

    cart.calculateTotals();
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (mongoose.connection.readyState !== 1) {
      const userId = req.user?._id?.toString() || 'guest';
      const cart = getDemoCart(userId);

      const itemIndex = cart.items.findIndex(
        (i) => i._id === req.params.itemId || (i.product?._id || i.product).toString() === req.params.itemId.toString()
      );

      if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: 'Item not found in cart' });
      }

      if (qty <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = qty;
      }

      calculateDemoTotals(cart);
      return res.json({ success: true, data: cart });
    }

    const cart = await findOrCreateCart(req.user._id);

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (qty <= 0) {
      cart.items.pull(item._id);
    } else {
      const product = await Product.findById(item.product);
      if (product && product.stockCount < qty) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stockCount} units available in stock`,
        });
      }
      item.quantity = qty;
    }

    cart.calculateTotals();
    await cart.save();

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeCartItem = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const userId = req.user?._id?.toString() || 'guest';
      const cart = getDemoCart(userId);
      cart.items = cart.items.filter(
        (i) => i._id !== req.params.itemId && (i.product?._id || i.product).toString() !== req.params.itemId.toString()
      );
      calculateDemoTotals(cart);
      return res.json({
        success: true,
        message: 'Item removed from cart',
        data: cart,
      });
    }

    const cart = await findOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    cart.items.pull(item._id);
    cart.calculateTotals();
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const userId = req.user?._id?.toString() || 'guest';
      const cart = getDemoCart(userId);
      cart.items = [];
      calculateDemoTotals(cart);
      return res.json({
        success: true,
        message: 'Cart cleared',
        data: cart,
      });
    }

    const cart = await findOrCreateCart(req.user._id);
    cart.items = [];
    cart.calculateTotals();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
