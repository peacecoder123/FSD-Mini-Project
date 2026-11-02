import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopease';

  try {
    // Attempt standard connection with 2.5s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB] Connected to external MongoDB instance at: ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (err) {
    console.warn(`[MongoDB] External MongoDB connection failed (${err.message}). Starting embedded high-performance MongoDB instance...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'shopease',
        },
      });
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[MongoDB] Connected to embedded MongoDB instance at: ${memoryUri}`);
    } catch (innerErr) {
      console.error(`[MongoDB] Failed to initialize embedded MongoDB:`, innerErr);
      process.exit(1);
    }
  }

  mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] Connection lost');
  });
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};

