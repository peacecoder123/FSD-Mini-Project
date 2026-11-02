import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { seedDatabaseIfEmpty } from './utils/seedData.js';

import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Database Connection (non-blocking for serverless cold-start speed)
connectDB()
  .then(() => seedDatabaseIfEmpty())
  .catch((err) => console.error('[DB Startup Error]:', err.message));

// Global Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve static uploads
const uploadsPath = path.resolve('uploads');
app.use('/uploads', express.static(uploadsPath));

// Root API Landing Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    platform: 'ShopEase E-Commerce REST API',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/offline',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      orders: '/api/orders',
      auth: '/api/auth'
    }
  });
});

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'ShopEase E-Commerce API',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/offline',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[ShopEase Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`[ShopEase Server] Health check available at: http://localhost:${PORT}/api/health`);
  });
}

export default app;

