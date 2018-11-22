const mongoose = require('mongoose');

const SubCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: true
  },
  categoryname:{
    type: String,
    default: ""
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('SubCategories', SubCategoriesSchema);
