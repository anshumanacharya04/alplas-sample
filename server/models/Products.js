const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', ProductsSchema);
