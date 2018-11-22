const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: Number,
    default: 1
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Categories', CategoriesSchema);
