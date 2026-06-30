const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
