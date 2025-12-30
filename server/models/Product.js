const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

productSchema.index({ description: 'text', tags: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);

