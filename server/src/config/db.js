import mongoose from 'mongoose';

let mongoMemoryServer = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (uri) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`[MongoDB] Connected to external MongoDB instance at: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      console.warn(`[MongoDB] External MongoDB connection failed (${err.message}).`);
    }
  }

  // In Vercel serverless environment, do not attempt to start in-memory binaries
  if (process.env.VERCEL) {
    console.warn(`[MongoDB] Running on Vercel without active cloud MongoDB. Set MONGODB_URI in Vercel Environment Variables.`);
    return;
  }

  // Local development fallback: Start embedded in-memory MongoDB
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongoMemoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'shopease',
      },
    });
    const memoryUri = mongoMemoryServer.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[MongoDB] Connected to embedded MongoDB instance at: ${memoryUri}`);
  } catch (innerErr) {
    console.error(`[MongoDB] Embedded MongoDB startup:`, innerErr.message);
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

