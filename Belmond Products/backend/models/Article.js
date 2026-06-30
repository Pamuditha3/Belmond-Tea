const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  readTime: {
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);
