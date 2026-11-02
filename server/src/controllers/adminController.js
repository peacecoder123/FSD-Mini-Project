import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get aggregated Admin dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    const pendingOrders = await Order.countDocuments({
      status: { $in: ['Processing', 'Confirmed'] },
    });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });

    // Low stock items (stockCount <= 5)
    const lowStockProducts = await Product.find({ stockCount: { $lte: 5 } })
      .select('title sku stockCount price category inStock')
      .limit(10);

    // Recent 6 orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(6);

    // Top rated products
    const topProducts = await Product.find()
      .sort({ rating: -1, numReviews: -1 })
      .limit(5);

    // Revenue by category aggregation
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
        },
      },
    ]);

    // Simulated 6-month revenue history for charting (in INR)
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const revenueChart = months.map((m, idx) => ({
      month: m,
      revenue: Math.round(145000 + idx * 48000 + (totalRevenue > 0 ? (totalRevenue % (idx + 2)) * 5000 : 15000)),
      orders: Math.round(12 + idx * 5),
    }));

    res.json({
      success: true,
      data: {
        metrics: {
          totalRevenue: parseFloat(totalRevenue.toFixed(2)),
          totalOrders,
          totalProducts,
          totalCustomers,
          pendingOrders,
          deliveredOrders,
        },
        lowStockProducts,
        recentOrders,
        topProducts,
        categoryStats,
        revenueChart,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registered users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin)
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

