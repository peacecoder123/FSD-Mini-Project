import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Helper to ensure cart exists
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
    const cart = await findOrCreateCart(req.user._id);

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    const qty = Number(quantity);
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

