import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  // Provide relative URL served statically
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
    },
  });
});

export default router;

