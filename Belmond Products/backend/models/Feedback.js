const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['product', 'inquiry']
  },
  // Product Review Fields
  product: {
    type: String,
    trim: true
  },
  article: {
    type: String,
    trim: true
  },
  dateOfManufacture: {
    type: String
  },
  timeOfManufacture: {
    type: String
  },
  productionLineNumber: {
    type: String
  },
  packagingFormat: {
    type: String
  },
  fileUrl: {
    type: String
  },
  // Common Fields
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
