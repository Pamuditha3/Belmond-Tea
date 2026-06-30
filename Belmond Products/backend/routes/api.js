const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { getMongoStatus } = require('../config/db');
const db = require('../data/dbFallback');

// Try to load Mongoose models (only used when MongoDB is connected)
let Product, Article, News, Feedback;
try {
  Product  = require('../models/Product');
  Article  = require('../models/Article');
  News     = require('../models/News');
  Feedback = require('../models/Feedback');
} catch (e) {
  console.warn('Mongoose models could not be loaded:', e.message);
}

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG photos are allowed.'));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper: true when Mongoose is live
const useMongo = () => getMongoStatus();

// ── PRODUCTS ──────────────────────────────────────────────

router.get('/products', async (req, res) => {
  try {
    const { type, format } = req.query;
    if (useMongo()) {
      const query = {};
      if (type)   query.type   = type;
      if (format) query.format = format;
      return res.json(await Product.find(query));
    }
    res.json(db.getJSONProducts({ type, format }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    if (useMongo()) {
      const p = await Product.findById(req.params.id);
      if (!p) return res.status(404).json({ message: 'Product not found' });
      return res.json(p);
    }
    const p = db.getJSONProductById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── JOURNAL ───────────────────────────────────────────────

router.get('/journal', async (req, res) => {
  try {
    if (useMongo()) return res.json(await Article.find().sort({ createdAt: -1 }));
    res.json(db.getJSONArticles());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── NEWS ──────────────────────────────────────────────────

router.get('/news', async (req, res) => {
  try {
    if (useMongo()) return res.json(await News.find().sort({ createdAt: -1 }));
    res.json(db.getJSONNews());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── FEEDBACK ──────────────────────────────────────────────

router.post('/feedback', upload.single('file'), async (req, res) => {
  try {
    const { type, product, article, dateOfManufacture, timeOfManufacture,
            productionLineNumber, packagingFormat, message, name, email } = req.body;

    if (!type || !name || !email || !message) {
      return res.status(400).json({ message: 'Required fields: type, name, email, message' });
    }

    let fileUrl = '';
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    } else if (type === 'product') {
      return res.status(400).json({ message: 'Product reviews require a photo attachment.' });
    }

    if (useMongo()) {
      const feedback = new Feedback({
        type, product, article, dateOfManufacture, timeOfManufacture,
        productionLineNumber, packagingFormat, fileUrl, message, name, email
      });
      await feedback.save();
      return res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    }

    // JSON fallback
    const saved = db.saveJSONFeedback({
      type, product, article, dateOfManufacture, timeOfManufacture,
      productionLineNumber, packagingFormat, fileUrl, message, name, email
    });
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
