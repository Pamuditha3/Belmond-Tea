const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['classic-black-teas', 'fruit-and-herbal-teas', 'green-teas-and-tisanes', 'gifts', 'wellness-collection']
  },
  format: {
    type: String,
    required: true,
    enum: ['sachets', 'leaf-and-granules', 'pyramids']
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  brewing: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
