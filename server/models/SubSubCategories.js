const mongoose = require('mongoose');

const SubSubCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: Number,
    default: 1
  },
  subcategoryname:{
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

module.exports = mongoose.model('SubSubCategories', SubSubCategoriesSchema);
