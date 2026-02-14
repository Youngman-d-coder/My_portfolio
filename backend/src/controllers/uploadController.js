const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (will use environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Use memory storage for local development when Cloudinary is not configured
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                       process.env.CLOUDINARY_API_KEY && 
                       process.env.CLOUDINARY_API_SECRET;

// Use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio-uploads',
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// Upload single image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let imageUrl;

    if (useCloudinary) {
      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    } else {
      // For development without Cloudinary, return a base64 string
      const base64 = req.file.buffer.toString('base64');
      imageUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      originalName: req.file.originalname,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

// Upload multiple images
exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(async (file) => {
      if (useCloudinary) {
        const result = await uploadToCloudinary(file.buffer);
        return {
          url: result.secure_url,
          originalName: file.originalname,
        };
      } else {
        const base64 = file.buffer.toString('base64');
        return {
          url: `data:${file.mimetype};base64,${base64}`,
          originalName: file.originalname,
        };
      }
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: 'Images uploaded successfully',
      images: imageUrls,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
};

module.exports = { upload };
