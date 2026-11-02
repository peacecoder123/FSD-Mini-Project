import express from 'express';
import {
  getDashboardStats,
  getUsers,
  updateUserRole,
} from '../controllers/adminController.js';
import {
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);
router.get('/orders', getAllOrders);
patchStatus: router.patch('/orders/:id/status', updateOrderStatus);

export default router;

