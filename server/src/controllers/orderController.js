import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import { shopEvents } from '../utils/eventEmitter.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items supplied' });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    }

    // Verify stock and compute verified prices
    const verifiedItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.title} not found` });
      }

      if (product.stockCount < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for ${product.title}. Only ${product.stockCount} remaining.`,
        });
      }

      verifiedItems.push({
        product: product._id,
        title: product.title,
        image: product.images[0] || item.image,
        price: product.price,
        quantity: item.quantity,
      });

      itemsPrice += product.price * item.quantity;
    }

    itemsPrice = parseFloat(itemsPrice.toFixed(2));
    const shippingPrice = itemsPrice > 499 ? 0 : 99;
    const taxPrice = parseFloat((itemsPrice * 0.05).toFixed(2)); // 5% tax
    const totalPrice = parseFloat((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    // Generate unique human-readable order number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `SE-ORD-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const isPaid = paymentMethod === 'card_simulated';
    const paidAt = isPaid ? new Date() : null;

    const order = new Order({
      user: req.user._id,
      orderNumber,
      items: verifiedItems,
      shippingAddress,
      paymentMethod,
      paymentResult: paymentResult || (isPaid ? {
        id: `SIM-TXN-${Date.now()}`,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        cardLast4: '4242',
      } : {}),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      status: 'Processing',
      trackingSteps: [
        {
          status: 'Order Placed',
          timestamp: new Date(),
          note: isPaid ? 'Payment confirmed via simulated gateway' : 'Cash on Delivery order booked',
        },
      ],
    });

    const savedOrder = await order.save();

    // Safely decrement stock count in Product collection
    for (const item of verifiedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockCount: -item.quantity },
      });
      // Update inStock flag
      const updatedProd = await Product.findById(item.product);
      if (updatedProd) {
        updatedProd.inStock = updatedProd.stockCount > 0;
        await updatedProd.save();
      }
    }

    // Clear user cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], subtotal: 0, total: 0 });

    // Emit event
    shopEvents.emit('order:placed', savedOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PATCH /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const oldStatus = order.status;
    order.status = status;

    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    order.trackingSteps.push({
      status,
      timestamp: new Date(),
      note: note || `Order updated to ${status}`,
    });

    const updatedOrder = await order.save();

    shopEvents.emit('order:status_changed', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      oldStatus,
      newStatus: status,
    });

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

