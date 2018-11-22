const mongoose = require('mongoose');

const SubSubCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('SubSubCategories', SubSubCategoriesSchema);
