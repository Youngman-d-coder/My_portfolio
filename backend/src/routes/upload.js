const express = require('express');
const router = express.Router();
const { upload, uploadImage, uploadImages } = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// Upload single image (requires authentication)
router.post('/image', auth, upload.single('image'), uploadImage);

// Upload multiple images (requires authentication)
router.post('/images', auth, upload.array('images', 10), uploadImages);

module.exports = router;
