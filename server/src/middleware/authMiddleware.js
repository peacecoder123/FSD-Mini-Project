import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { mockUsers } from '../data/mockUsers.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shopease_super_secret_jwt_key_2026');

      if (mongoose.connection.readyState !== 1) {
        const found = mockUsers.find((u) => u._id === decoded.id);
        req.user = found || {
          _id: decoded.id,
          name: 'Demo User',
          email: 'demo@shopease.com',
          role: decoded.id === '65f000000000000000000101' ? 'admin' : 'customer',
        };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found for this token' });
      }
      return next();
    } catch (error) {
      console.error('[AUTH ERROR]', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Administrator privileges required' });
  }
};

